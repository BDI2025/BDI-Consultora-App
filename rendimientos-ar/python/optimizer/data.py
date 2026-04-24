from dataclasses import dataclass

import pandas as pd
import yfinance as yf

from .errors import OptimizerError
from .inputs import OptimizerInputs


@dataclass(frozen=True)
class MarketDataset:
    data: pd.DataFrame
    returns: pd.DataFrame
    mean_returns: pd.Series
    cov_matrix: pd.DataFrame
    assets: list[str]


def normalize_download(downloaded: pd.DataFrame, tickers: list[str]) -> pd.DataFrame:
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


def load_market_dataset(inputs: OptimizerInputs) -> MarketDataset:
    downloaded = yf.download(
        inputs.tickers,
        period=f"{inputs.years}y",
        auto_adjust=True,
        progress=False,
        group_by="column",
        threads=True,
    )
    data = normalize_download(downloaded, inputs.tickers)
    data = data.dropna(axis=1, how="any")
    if data.shape[1] == 0:
        raise OptimizerError("No hay datos disponibles para los tickers ingresados.")

    returns = data.pct_change().dropna()
    if returns.empty:
        raise OptimizerError("No hay datos comparables para los tickers ingresados.")

    return MarketDataset(
        data=data,
        returns=returns,
        mean_returns=returns.mean() * 252,
        cov_matrix=returns.cov() * 252,
        assets=list(returns.columns),
    )
