import pathlib
import sys
import unittest
from unittest.mock import patch

import pandas as pd


PYTHON_DIR = pathlib.Path(__file__).resolve().parents[1]
if str(PYTHON_DIR) not in sys.path:
    sys.path.insert(0, str(PYTHON_DIR))

from optimizer.data import load_market_dataset, normalize_download
from optimizer.inputs import OptimizerInputs


class OptimizerDataTests(unittest.TestCase):
    def test_normalize_download_single_ticker_close_column(self):
        frame = pd.DataFrame(
            {"Close": [100.0, 101.0, 103.0]},
            index=pd.date_range("2024-01-01", periods=3, freq="D"),
        )

        result = normalize_download(frame, ["AAPL"])

        self.assertListEqual(list(result.columns), ["AAPL"])
        self.assertEqual(len(result), 3)

    @patch("optimizer.data.yf.download")
    def test_load_market_dataset_builds_returns_and_assets(self, mock_download):
        dates = pd.date_range("2024-01-01", periods=5, freq="D")
        mock_download.return_value = pd.DataFrame(
            {
                ("Close", "AAPL"): [100.0, 102.0, 104.0, 103.0, 106.0],
                ("Close", "MSFT"): [200.0, 202.0, 201.0, 205.0, 207.0],
            },
            index=dates,
        )

        dataset = load_market_dataset(
            OptimizerInputs(
                tickers=["AAPL", "MSFT"],
                years=5,
                rf=0.02,
                target_return=None,
                min_weight=0.0,
                random_count=1000,
            )
        )

        self.assertEqual(dataset.assets, ["AAPL", "MSFT"])
        self.assertEqual(len(dataset.returns), 4)
        self.assertEqual(dataset.cov_matrix.shape, (2, 2))
        self.assertIn("AAPL", dataset.mean_returns.index)


if __name__ == "__main__":
    unittest.main()
