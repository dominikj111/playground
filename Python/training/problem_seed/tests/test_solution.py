import importlib.util
import runpy
from pathlib import Path
from types import ModuleType

PROBLEM_DIR = Path(__file__).resolve().parents[1]
SOLUTION_PATH = PROBLEM_DIR / "solution.py"
MODULE_NAME = f"{PROBLEM_DIR.name}_solution"


def load_solution() -> ModuleType:
    """Load solution.py without requiring the problem directory to be a package."""
    spec = importlib.util.spec_from_file_location(MODULE_NAME, SOLUTION_PATH)
    assert spec is not None
    assert spec.loader is not None

    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


# Test-writing checklist for each copied problem:
# 1. Add tests for the public function(s) you expect candidates to implement.
# 2. Cover at least one normal case, one edge case, and one failure/empty case.
# 3. Keep a direct-run test when the problem has script output through main().
# 4. Keep assertions exact and readable so the interview expectation is obvious.


def test_main_placeholder_is_replaced() -> None:
    solution = load_solution()

    try:
        solution.main()
    except NotImplementedError:
        pass
    else:
        raise AssertionError("Replace this seed test with problem-specific assertions")


# Use this pattern for script-style exercises. Update or delete it when not needed.
def test_running_file_directly_placeholder_is_replaced(capsys) -> None:  # type: ignore[no-untyped-def]
    try:
        runpy.run_path(str(SOLUTION_PATH), run_name="__main__")
    except NotImplementedError:
        pass
    else:
        raise AssertionError("Assert the expected stdout for this problem")

    assert capsys.readouterr().out == ""
