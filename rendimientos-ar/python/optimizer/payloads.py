from typing import Any, Dict

from .analytics import (
    build_asset_series,
    build_cagr_rows,
    build_portfolio_returns,
    build_portfolio_series,
)
from .data import load_market_dataset
from .inputs import parse_inputs
from .optimize import optimize_model


def build_payload(params: Dict[str, Any]) -> Dict[str, Any]:
    inputs = parse_inputs(params)
    dataset = load_market_dataset(inputs)
    optimization = optimize_model(
        mean_returns=dataset.mean_returns,
        cov_matrix=dataset.cov_matrix,
        rf=inputs.rf,
        min_weight=inputs.min_weight,
        target_return=inputs.target_return,
        random_count=inputs.random_count,
    )

    cum_rets = (1 + dataset.returns).cumprod() - 1
    port_returns = build_portfolio_returns(
        returns=dataset.returns,
        assets=dataset.assets,
        max_sharpe_weights=optimization.max_sharpe.weights,
        min_vol_weights=optimization.min_vol.weights,
        target_weights=None if optimization.target_portfolio is None else optimization.target_portfolio.weights,
    )
    cum_port = (1 + port_returns).cumprod() - 1

    return {
        "assets": dataset.assets,
        "dates": [str(index.date()) for index in dataset.returns.index],
        "rf": inputs.rf,
        "minWeight": inputs.min_weight,
        "targetReturn": inputs.target_return,
        "randomPortfolios": optimization.random_portfolios,
        "frontier": optimization.frontier,
        "maxSharpe": {
            "ret": optimization.max_sharpe.ret,
            "vol": optimization.max_sharpe.vol,
            "sharpe": optimization.max_sharpe.sharpe,
            "weights": optimization.max_sharpe.weights,
        },
        "minVol": {
            "ret": optimization.min_vol.ret,
            "vol": optimization.min_vol.vol,
            "sharpe": optimization.min_vol.sharpe,
            "weights": optimization.min_vol.weights,
        },
        "targetPortfolio": None if optimization.target_portfolio is None else {
            "ret": optimization.target_portfolio.ret,
            "vol": optimization.target_portfolio.vol,
            "sharpe": optimization.target_portfolio.sharpe,
            "weights": optimization.target_portfolio.weights,
        },
        "assetSeries": build_asset_series(cum_rets),
        "portfolioSeries": build_portfolio_series(cum_port, inputs.target_return),
        "cagrRows": build_cagr_rows(cum_rets, cum_port),
        "correlation": dataset.returns.corr().fillna(0.0).values.tolist(),
        "engine": "python-scipy",
        "assetsCount": len(dataset.assets),
        "daysCount": len(dataset.returns.index),
    }
