import pathlib
import sys
import unittest

import pandas as pd


PYTHON_DIR = pathlib.Path(__file__).resolve().parents[1]
if str(PYTHON_DIR) not in sys.path:
    sys.path.insert(0, str(PYTHON_DIR))

from optimizer.analytics import build_portfolio_returns, calc_cagr


class AnalyticsTests(unittest.TestCase):
    def test_calc_cagr_returns_positive_annualized_rate(self):
        dates = pd.to_datetime(["2024-01-01", "2024-07-01", "2025-01-01"])
        series = pd.Series([0.0, 0.05, 0.10], index=dates)

        result = calc_cagr(series)

        self.assertGreater(result, 0)
        self.assertLess(result, 0.11)

    def test_build_portfolio_returns_combines_assets(self):
        returns = pd.DataFrame(
            {
                "AAPL": [0.01, 0.02, -0.01],
                "MSFT": [0.00, 0.03, 0.01],
            },
            index=pd.date_range("2024-01-01", periods=3, freq="D"),
        )

        result = build_portfolio_returns(
            returns=returns,
            assets=["AAPL", "MSFT"],
            max_sharpe_weights=[0.6, 0.4],
            min_vol_weights=[0.8, 0.2],
            target_weights=None,
        )

        self.assertListEqual(list(result.columns), ["max_sharpe", "min_vol"])
        self.assertAlmostEqual(result.iloc[0]["max_sharpe"], 0.006)
        self.assertAlmostEqual(result.iloc[1]["min_vol"], 0.022)


if __name__ == "__main__":
    unittest.main()
