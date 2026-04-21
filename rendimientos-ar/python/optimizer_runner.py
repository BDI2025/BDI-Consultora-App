import json
import os
import sys
from typing import Any, Dict, List, Optional

import numpy as np
import pandas as pd
import yfinance as yf
from scipy.optimize import minimize


def clear_proxy_env() -> None:
    for key in (
        "HTTP_PROXY",
        "HTTPS_PROXY",
        "ALL_PROXY",
        "http_proxy",
        "https_proxy",
        "all_proxy",
    ):
        os.environ.pop(key, None)
    os.environ["NO_PROXY"] = "*"
    os.environ["no_proxy"] = "*"


def fail(message: str, details: Optional[str] = None) -> None:
    payload = {"error": message}
    if details:
        payload["details"] = details
    sys.stderr.write(json.dumps(payload))
    raise SystemExit(1)


def normalize_download(downloaded: pd.DataFrame, tickers: List[str]) -> pd.DataFrame:
    if downloaded is None or downloaded.empty:
        return pd.DataFrame()

    if isinstance(downloaded.columns, pd.MultiIndex):
        if "Close" not in downloaded.columns.get_level_values(0):
            return pd.DataFrame()
        close = downloaded["Close"].copy()
        if isinstance(close, pd.Series):
            close = close.to_frame(name=tickers[0] if tickers else "Close")
        return close

    if "Close" not in downloaded.columns:
        return pd.DataFrame()
    column_name = tickers[0] if tickers else "Close"
    return downloaded[["Close"]].rename(columns={"Close": column_name})


def series_to_percent_list(series: pd.Series) -> List[float]:
    return [float(value * 100) for value in series.to_list()]


def portfolio_stats(weights: np.ndarray, mean_returns: pd.Series, cov_matrix: pd.DataFrame, rf: float):
    ret = float(np.dot(weights, mean_returns))
    vol = float(np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights))))
    sharpe = float((ret - rf) / vol) if vol > 0 else 0.0
    return ret, vol, sharpe


def build_payload(params: Dict[str, Any]) -> Dict[str, Any]:
    tickers = [str(t).strip().upper() for t in params.get("tickers", []) if str(t).strip()][:50]
    if not tickers:
        fail("Debe ingresar al menos 1 ticker.")

    years = int(params.get("years", 5) or 5)
    years = max(1, min(10, years))
    rf = float(params.get("rf", 0.02) or 0.02)
    target_return = params.get("targetReturn", None)
    target_return = None if target_return in ("", None) else float(target_return)
    min_weight = float(params.get("minWeight", 0.0) or 0.0)
    min_weight = max(0.0, min(1.0, min_weight))
    random_count = int(params.get("randomCount", 100000) or 100000)
    random_count = max(1000, min(100000, random_count))

    if len(tickers) * min_weight > 1:
        fail("El peso mínimo es demasiado alto para la cantidad de activos seleccionados.")

    period = f"{years}y"
    downloaded = yf.download(
        tickers,
        period=period,
        auto_adjust=True,
        progress=False,
        group_by="column",
        threads=True,
    )
    data = normalize_download(downloaded, tickers)
    data = data.dropna(axis=1, how="any")
    if data.shape[1] == 0:
        fail("No hay datos disponibles para los tickers ingresados.")

    returns = data.pct_change().dropna()
    if returns.empty:
        fail("No hay datos comparables para los tickers ingresados.")

    mean_returns = returns.mean() * 252
    cov_matrix = returns.cov() * 252
    assets = list(returns.columns)
    num_assets = len(assets)

    if min_weight > 0:
        bounds = tuple((min_weight, 1) for _ in range(num_assets))
    else:
        bounds = tuple((0, 1) for _ in range(num_assets))

    constraints = ({"type": "eq", "fun": lambda x: np.sum(x) - 1},)
    w0 = np.array(num_assets * [1.0 / num_assets])

    def neg_sharpe(weights):
        return -portfolio_stats(weights, mean_returns, cov_matrix, rf)[2]

    def min_vol(weights):
        return portfolio_stats(weights, mean_returns, cov_matrix, rf)[1]

    opt_sharpe = minimize(neg_sharpe, w0, method="SLSQP", bounds=bounds, constraints=constraints)
    if not opt_sharpe.success:
        fail("No se pudo calcular el portfolio de Sharpe optimo.", opt_sharpe.message)
    w_sharpe = opt_sharpe.x
    ret_sharpe, vol_sharpe, sharpe = portfolio_stats(w_sharpe, mean_returns, cov_matrix, rf)

    opt_vol = minimize(min_vol, w0, method="SLSQP", bounds=bounds, constraints=constraints)
    if not opt_vol.success:
        fail("No se pudo calcular el portfolio de minima volatilidad.", opt_vol.message)
    w_vol = opt_vol.x
    ret_vol, vol_min, sharpe_vol = portfolio_stats(w_vol, mean_returns, cov_matrix, rf)

    w_obj = None
    ret_obj_real = None
    vol_obj = None
    sharpe_obj = None
    if target_return is not None:
        def target_ret(weights):
            return np.dot(weights, mean_returns) - target_return

        constraints_obj = (
            {"type": "eq", "fun": lambda x: np.sum(x) - 1},
            {"type": "eq", "fun": target_ret},
        )
        opt_obj = minimize(min_vol, w0, method="SLSQP", bounds=bounds, constraints=constraints_obj)
        if opt_obj.success:
            w_obj = opt_obj.x
            ret_obj_real, vol_obj, sharpe_obj = portfolio_stats(w_obj, mean_returns, cov_matrix, rf)

    def efficient_frontier(returns_range):
        frontier = []
        for expected_ret in returns_range:
            constraints_ef = (
                {"type": "eq", "fun": lambda x: np.sum(x) - 1},
                {"type": "eq", "fun": lambda x, target=expected_ret: np.dot(x, mean_returns) - target},
            )
            opt = minimize(min_vol, w0, method="SLSQP", bounds=bounds, constraints=constraints_ef)
            if opt.success:
                ret, vol, sharpe_ratio = portfolio_stats(opt.x, mean_returns, cov_matrix, rf)
                frontier.append({
                    "weights": opt.x.tolist(),
                    "ret": ret,
                    "vol": vol,
                    "sharpe": sharpe_ratio,
                    "x": vol * 100,
                    "y": ret * 100,
                })
        return frontier

    ret_range = np.linspace(float(min(mean_returns)), float(max(mean_returns)), 100)
    frontier = efficient_frontier(ret_range)

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

    cum_rets = (1 + returns).cumprod() - 1
    portfolios = {
        "max_sharpe": w_sharpe,
        "min_vol": w_vol,
    }
    if w_obj is not None:
        portfolios["target"] = w_obj

    port_returns = pd.DataFrame(index=returns.index)
    for name, weights in portfolios.items():
        port_returns[name] = returns[assets].dot(weights)
    cum_port = (1 + port_returns).cumprod() - 1

    def calc_cagr(series: pd.Series) -> float:
        total_periods = (series.index[-1] - series.index[0]).days / 365.25
        total_return = float(series.iloc[-1] + 1)
        if total_periods <= 0:
            return 0.0
        return float(total_return ** (1 / total_periods) - 1)

    cagr_rows = []
    for asset in cum_rets.columns:
        cagr_rows.append({
            "label": asset,
            "type": "Activo",
            "cagr": calc_cagr(cum_rets[asset]),
        })
    for portfolio_name in cum_port.columns:
        cagr_rows.append({
            "label": portfolio_name,
            "type": "Portfolio",
            "cagr": calc_cagr(cum_port[portfolio_name]),
        })

    correlation = returns.corr().fillna(0.0).values.tolist()

    asset_series = [
        {
            "label": asset,
            "values": series_to_percent_list(cum_rets[asset]),
        }
        for asset in cum_rets.columns
    ]

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

    payload = {
        "assets": assets,
        "dates": [str(index.date()) for index in returns.index],
        "rf": rf,
        "minWeight": min_weight,
        "targetReturn": target_return,
        "randomPortfolios": random_portfolios,
        "frontier": [{"x": item["x"], "y": item["y"]} for item in frontier],
        "maxSharpe": {
            "ret": ret_sharpe,
            "vol": vol_sharpe,
            "sharpe": sharpe,
            "weights": w_sharpe.tolist(),
        },
        "minVol": {
            "ret": ret_vol,
            "vol": vol_min,
            "sharpe": sharpe_vol,
            "weights": w_vol.tolist(),
        },
        "targetPortfolio": None if w_obj is None else {
            "ret": ret_obj_real,
            "vol": vol_obj,
            "sharpe": sharpe_obj,
            "weights": w_obj.tolist(),
        },
        "assetSeries": asset_series,
        "portfolioSeries": portfolio_series,
        "cagrRows": cagr_rows,
        "correlation": correlation,
        "engine": "python-scipy",
        "assetsCount": len(assets),
        "daysCount": len(returns.index),
    }
    return payload


def main() -> None:
    clear_proxy_env()
    try:
        params = json.load(sys.stdin)
    except Exception as exc:
        fail("No se pudieron leer los parametros del optimizador.", str(exc))

    try:
        payload = build_payload(params)
    except SystemExit:
        raise
    except Exception as exc:
        fail("Error al ejecutar el optimizador Python.", str(exc))

    sys.stdout.write(json.dumps(payload))


if __name__ == "__main__":
    main()
