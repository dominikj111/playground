"""
Problem 001 — Hello World

Goal:
    Implement the classic first Python program in a testable way.

Requirements:
    1. `hello_world()` returns exactly "Hello, World!".
    2. `main()` prints exactly "Hello, World!" followed by one newline.
    3. Running this file directly executes `main()`.

Interview focus:
    - Understand the difference between returning a value and printing output.
    - Use a small `main()` function instead of putting script behavior at import time.
    - Use the `if __name__ == "__main__"` guard.

Implementation task:
    Replace the `NotImplementedError` placeholders with a working solution.
"""


def hello_world() -> str:
    """Return the Hello World message."""
    return "Hello, World!"


def main() -> None:
    """Print the Hello World message."""
    print(hello_world())


if __name__ == "__main__":
    main()
