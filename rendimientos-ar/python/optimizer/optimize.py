from dataclasses import dataclass
from typing import Optional

import numpy as np
import pandas as pd
from scipy.optimize import minimize

from .errors import OptimizerError


@dataclass(frozen=True)
class PortfolioPoint:
    ret: float
    vol: float
    sharpe: float
    weights: list[float]


@dataclass(frozen=True)
class OptimizationResult:
    max_sharpe: PortfolioPoint
    min_vol: PortfolioPoint
    target_portfolio: Optional[PortfolioPoint]
    frontier: list[dict[str, float]]
    random_portfolios: list[dict[str, object]]


def portfolio_stats(weights: np.ndarray, mean_returns: pd.Series, cov_matrix: pd.DataFrame, rf: float):
    ret = float(np.dot(weights, mean_returns))
    vol = float(np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights))))
    sharpe = float((ret - rf) / vol) if vol > 0 else 0.0
    return ret, vol, sharpe


def to_portfolio_point(weights: np.ndarray, mean_returns: pd.Series, cov_matrix: pd.DataFrame, rf: float) -> PortfolioPoint:
    ret, vol, sharpe = portfolio_stats(weights, mean_returns, cov_matrix, rf)
    return PortfolioPoint(ret=ret, vol=vol, sharpe=sharpe, weights=weights.tolist())


def optimize_model(
    mean_returns: pd.Series,
    cov_matrix: pd.DataFrame,
    rf: float,
    min_weight: float,
    target_return: Optional[float],
    random_count: int,
) -> OptimizationResult:
    num_assets = len(mean_returns)
    bounds = tuple((min_weight, 1) for _ in range(num_assets)) if min_weight > 0 else tuple((0, 1) for _ in range(num_assets))
    constraints = ({"type": "eq", "fun": lambda x: np.sum(x) - 1},)
    w0 = np.array(num_assets * [1.0 / num_assets])

    def neg_sharpe(weights):
        return -portfolio_stats(weights, mean_returns, cov_matrix, rf)[2]

    def min_vol(weights):
        return portfolio_stats(weights, mean_returns, cov_matrix, rf)[1]

    opt_sharpe = minimize(neg_sharpe, w0, method="SLSQP", bounds=bounds, constraints=constraints)
    if not opt_sharpe.success:
        raise OptimizerError("No se pudo calcular el portfolio de Sharpe optimo.", opt_sharpe.message)

    opt_vol = minimize(min_vol, w0, method="SLSQP", bounds=bounds, constraints=constraints)
    if not opt_vol.success:
        raise OptimizerError("No se pudo calcular el portfolio de minima volatilidad.", opt_vol.message)

    target_portfolio = None
    if target_return is not None:
        def target_ret(weights):
            return np.dot(weights, mean_returns) - target_return

        constraints_obj = (
            {"type": "eq", "fun": lambda x: np.sum(x) - 1},
            {"type": "eq", "fun": target_ret},
        )
        opt_obj = minimize(min_vol, w0, method="SLSQP", bounds=bounds, constraints=constraints_obj)
        if opt_obj.success:
            target_portfolio = to_portfolio_point(opt_obj.x, mean_returns, cov_matrix, rf)

    ret_range = np.linspace(float(min(mean_returns)), float(max(mean_returns)), 100)
    frontier = []
    for expected_ret in ret_range:
        constraints_ef = (
            {"type": "eq", "fun": lambda x: np.sum(x) - 1},
            {"type": "eq", "fun": lambda x, target=expected_ret: np.dot(x, mean_returns) - target},
        )
        opt = minimize(min_vol, w0, method="SLSQP", bounds=bounds, constraints=constraints_ef)
        if opt.success:
            ret, vol, _ = portfolio_stats(opt.x, mean_returns, cov_matrix, rf)
            frontier.append({"x": vol * 100, "y": ret * 100})

    random_portfolios = []
    attempts = 0
    max_attempts = random_count * (15 if min_weight > 0 else 2)
    while len(random_portfolios) < random_count and attempts < max_attempts:
        attempts += 1
        weights = np.random.dirichlet(np.ones(num_assets), size=1)[0]
        if min_weight > 0 and np.any(weights < min_weight):
            continue
        ret, vol, sharpe_random = portfolio_stats(weights, mean_returns, cov_matrix, rf)
        random_portfolios.append({
            "weights": weights.tolist(),
            "ret": ret,
            "vol": vol,
            "sharpe": sharpe_random,
        })

    return OptimizationResult(
        max_sharpe=to_portfolio_point(opt_sharpe.x, mean_returns, cov_matrix, rf),
        min_vol=to_portfolio_point(opt_vol.x, mean_returns, cov_matrix, rf),
        target_portfolio=target_portfolio,
        frontier=frontier,
        random_portfolios=random_portfolios,
    )
