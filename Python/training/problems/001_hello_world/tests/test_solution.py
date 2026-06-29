import importlib.util
import runpy
from pathlib import Path
from types import ModuleType

PROBLEM_DIR = Path(__file__).resolve().parents[1]
SOLUTION_PATH = PROBLEM_DIR / "solution.py"


def load_solution() -> ModuleType:
    spec = importlib.util.spec_from_file_location("problem_001_solution", SOLUTION_PATH)
    assert spec is not None
    assert spec.loader is not None

    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_hello_world_returns_expected_message() -> None:
    solution = load_solution()

    assert solution.hello_world() == "Hello, World!"


def test_main_prints_expected_message(capsys) -> None:  # type: ignore[no-untyped-def]
    solution = load_solution()

    result = solution.main()

    assert result is None
    assert capsys.readouterr().out == "Hello, World!\n"


def test_running_file_directly_prints_expected_message(capsys) -> None:  # type: ignore[no-untyped-def]
    runpy.run_path(str(SOLUTION_PATH), run_name="__main__")

    assert capsys.readouterr().out == "Hello, World!\n"
