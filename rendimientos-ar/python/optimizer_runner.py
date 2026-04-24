import json
import os
import sys
from typing import Optional

from optimizer import build_payload
from optimizer.errors import OptimizerError


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


def main() -> None:
    clear_proxy_env()
    try:
        params = json.load(sys.stdin)
    except Exception as exc:
        fail("No se pudieron leer los parametros del optimizador.", str(exc))

    try:
        payload = build_payload(params)
    except OptimizerError as exc:
        fail(exc.message, exc.details)
    except SystemExit:
        raise
    except Exception as exc:
        fail("Error al ejecutar el optimizador Python.", str(exc))

    sys.stdout.write(json.dumps(payload))


if __name__ == "__main__":
    main()
