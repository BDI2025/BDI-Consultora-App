from typing import Any, Optional

import pandas as pd


def series_to_percent_list(series: pd.Series) -> list[float]:
    return [float(value * 100) for value in series.to_list()]


def calc_cagr(series: pd.Series) -> float:
    total_periods = (series.index[-1] - series.index[0]).days / 365.25
    total_return = float(series.iloc[-1] + 1)
    if total_periods <= 0:
        return 0.0
    return float(total_return ** (1 / total_periods) - 1)


def build_portfolio_returns(
    returns: pd.DataFrame,
    assets: list[str],
    max_sharpe_weights: list[float],
    min_vol_weights: list[float],
    target_weights: Optional[list[float]],
) -> pd.DataFrame:
    portfolios: dict[str, list[float]] = {
        "max_sharpe": max_sharpe_weights,
        "min_vol": min_vol_weights,
    }
    if target_weights is not None:
        portfolios["target"] = target_weights

    port_returns = pd.DataFrame(index=returns.index)
    for name, weights in portfolios.items():
        port_returns[name] = returns[assets].dot(weights)
    return port_returns


def build_asset_series(cum_rets: pd.DataFrame) -> list[dict[str, Any]]:
    return [
        {"label": asset, "values": series_to_percent_list(cum_rets[asset])}
        for asset in cum_rets.columns
    ]


def build_portfolio_series(cum_port: pd.DataFrame, target_return: Optional[float]) -> list[dict[str, Any]]:
    portfolio_series = []
    if "max_sharpe" in cum_port.columns:
        portfolio_series.append({
            "key": "max_sharpe",
            "label": "max_sharpe",
            "color": "#e0b100",
            "values": series_to_percent_list(cum_port["max_sharpe"]),
        })
    if "min_vol" in cum_port.columns:
        portfolio_series.append({
            "key": "min_vol",
            "label": "min_vol",
            "color": "#e25555",
            "values": series_to_percent_list(cum_port["min_vol"]),
        })
    if "target" in cum_port.columns and target_return is not None:
        portfolio_series.append({
            "key": "target",
            "label": "target",
            "color": "#157347",
            "values": series_to_percent_list(cum_port["target"]),
        })
    return portfolio_series


def build_cagr_rows(cum_rets: pd.DataFrame, cum_port: pd.DataFrame) -> list[dict[str, Any]]:
    cagr_rows = []
    for asset in cum_rets.columns:
        cagr_rows.append({"label": asset, "type": "Activo", "cagr": calc_cagr(cum_rets[asset])})
    for portfolio_name in cum_port.columns:
        cagr_rows.append({"label": portfolio_name, "type": "Portfolio", "cagr": calc_cagr(cum_port[portfolio_name])})
    return cagr_rows
