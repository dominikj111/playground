"""Validation helpers shared by small exercises."""


def parse_int(value: str) -> int | None:
    """Parse an integer from text, returning ``None`` for invalid input."""
    stripped = value.strip()

    if not stripped:
        return None

    try:
        return int(stripped)
    except ValueError:
        return None
