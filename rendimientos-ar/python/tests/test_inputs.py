import pathlib
import sys
import unittest


PYTHON_DIR = pathlib.Path(__file__).resolve().parents[1]
if str(PYTHON_DIR) not in sys.path:
    sys.path.insert(0, str(PYTHON_DIR))

from optimizer.errors import OptimizerError
from optimizer.inputs import parse_inputs


class ParseInputsTests(unittest.TestCase):
    def test_parse_inputs_normalizes_values(self):
        result = parse_inputs({
            "tickers": [" aapl ", "msft", ""],
            "years": 20,
            "rf": 0.03,
            "targetReturn": "0.12",
            "minWeight": 0.1,
            "randomCount": 200000,
        })

        self.assertEqual(result.tickers, ["AAPL", "MSFT"])
        self.assertEqual(result.years, 10)
        self.assertEqual(result.rf, 0.03)
        self.assertEqual(result.target_return, 0.12)
        self.assertEqual(result.min_weight, 0.1)
        self.assertEqual(result.random_count, 100000)

    def test_parse_inputs_requires_at_least_one_ticker(self):
        with self.assertRaises(OptimizerError):
            parse_inputs({"tickers": ["", " "]})

    def test_parse_inputs_rejects_impossible_min_weight(self):
        with self.assertRaises(OptimizerError):
            parse_inputs({
                "tickers": ["AAPL", "MSFT", "GOOGL"],
                "minWeight": 0.4,
            })


if __name__ == "__main__":
    unittest.main()
