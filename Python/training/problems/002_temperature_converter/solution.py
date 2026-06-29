"""
Problem 002 — Temperature Converter

Goal:
    Convert temperatures between Celsius, Fahrenheit, and Kelvin using a small,
    testable function.

Requirements:
    1. Implement `convert_temperature(value, from_unit, to_unit)`.
    2. Support Celsius, Fahrenheit, and Kelvin using unit labels "C", "F", and "K".
    3. Return the converted temperature as a float.
    4. Treat converting a value to the same unit as an identity conversion.
    5. Raise `ValueError` for unsupported units.
    6. Raise `ValueError` when a Kelvin input is below absolute zero.

Examples:
    - `convert_temperature(0, "C", "F")` returns `32.0`.
    - `convert_temperature(32, "F", "C")` returns `0.0`.
    - `convert_temperature(273.15, "K", "C")` returns `0.0`.

Constraints and edge cases:
    - Keep the implementation small and readable.
    - Use standard arithmetic formulas; no third-party packages are needed.
    - Be mindful of floating-point comparisons in tests and examples.
    - Kelvin values cannot be below `0`.

Interview focus:
    - Practice simple function design with type hints.
    - Translate domain formulas into readable code.
    - Validate inputs and communicate errors with exceptions.
    - Separate reusable conversion logic from optional script behavior.

Implementation task:
    Replace the placeholders below with your implementation.
"""


def convert_temperature(value: float, from_unit: str, to_unit: str) -> float:
    """Convert a temperature value between C, F, and K."""
    raise NotImplementedError


def main() -> None:
    """Run the solution for script-style experiments."""
    raise NotImplementedError


if __name__ == "__main__":
    main()
