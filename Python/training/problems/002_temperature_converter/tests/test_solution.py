import importlib.util
from pathlib import Path
from types import ModuleType

import pytest

PROBLEM_DIR = Path(__file__).resolve().parents[1]
SOLUTION_PATH = PROBLEM_DIR / "solution.py"


def load_solution() -> ModuleType:
    spec = importlib.util.spec_from_file_location("problem_002_solution", SOLUTION_PATH)
    assert spec is not None
    assert spec.loader is not None

    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_convert_temperature_function_exists() -> None:
    solution = load_solution()

    assert callable(solution.convert_temperature)


def test_convert_temperature_converts_celsius_to_fahrenheit() -> None:
    solution = load_solution()

    assert solution.convert_temperature(0, "C", "F") == pytest.approx(32.0)


def test_convert_temperature_rejects_unknown_unit() -> None:
    solution = load_solution()

    with pytest.raises(ValueError):
        solution.convert_temperature(10, "C", "X")
