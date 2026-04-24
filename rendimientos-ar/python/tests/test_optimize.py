import math
import pathlib
import sys
import unittest

import pandas as pd


PYTHON_DIR = pathlib.Path(__file__).resolve().parents[1]
if str(PYTHON_DIR) not in sys.path:
    sys.path.insert(0, str(PYTHON_DIR))

from optimizer.optimize import optimize_model


class OptimizeModelTests(unittest.TestCase):
    def test_optimize_model_returns_feasible_portfolios(self):
        mean_returns = pd.Series([0.10, 0.14], index=["AAPL", "MSFT"])
        cov_matrix = pd.DataFrame(
            [[0.040, 0.010], [0.010, 0.090]],
            index=["AAPL", "MSFT"],
            columns=["AAPL", "MSFT"],
        )

        result = optimize_model(
            mean_returns=mean_returns,
            cov_matrix=cov_matrix,
            rf=0.02,
            min_weight=0.0,
            target_return=0.12,
            random_count=25,
        )

        self.assertAlmostEqual(sum(result.max_sharpe.weights), 1.0, places=6)
        self.assertAlmostEqual(sum(result.min_vol.weights), 1.0, places=6)
        self.assertIsNotNone(result.target_portfolio)
        self.assertAlmostEqual(sum(result.target_portfolio.weights), 1.0, places=6)
        self.assertGreater(len(result.frontier), 0)
        self.assertEqual(len(result.random_portfolios), 25)

    def test_optimize_model_respects_min_weight_bounds(self):
        mean_returns = pd.Series([0.11, 0.13, 0.15], index=["A", "B", "C"])
        cov_matrix = pd.DataFrame(
            [
                [0.040, 0.012, 0.010],
                [0.012, 0.050, 0.011],
                [0.010, 0.011, 0.070],
            ],
            index=["A", "B", "C"],
            columns=["A", "B", "C"],
        )

        result = optimize_model(
            mean_returns=mean_returns,
            cov_matrix=cov_matrix,
            rf=0.02,
            min_weight=0.2,
            target_return=None,
            random_count=10,
        )

        for weight in result.max_sharpe.weights:
            self.assertGreaterEqual(weight + 1e-8, 0.2)
        for weight in result.min_vol.weights:
            self.assertGreaterEqual(weight + 1e-8, 0.2)
        for portfolio in result.random_portfolios:
            self.assertTrue(all(weight + 1e-8 >= 0.2 for weight in portfolio["weights"]))


if __name__ == "__main__":
    unittest.main()
