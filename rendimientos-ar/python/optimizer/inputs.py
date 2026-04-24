from dataclasses import dataclass
from typing import Any, Dict, Optional

from .errors import OptimizerError


@dataclass(frozen=True)
class OptimizerInputs:
    tickers: list[str]
    years: int
    rf: float
    target_return: Optional[float]
    min_weight: float
    random_count: int


def parse_inputs(params: Dict[str, Any]) -> OptimizerInputs:
    tickers = [str(t).strip().upper() for t in params.get("tickers", []) if str(t).strip()][:50]
    if not tickers:
        raise OptimizerError("Debe ingresar al menos 1 ticker.")

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
        raise OptimizerError("El peso mínimo es demasiado alto para la cantidad de activos seleccionados.")

    return OptimizerInputs(
        tickers=tickers,
        years=years,
        rf=rf,
        target_return=target_return,
        min_weight=min_weight,
        random_count=random_count,
    )
