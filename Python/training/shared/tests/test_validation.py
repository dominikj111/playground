from pyutils.validation import parse_int


def test_parse_int_accepts_valid_integer_text() -> None:
    assert parse_int("42") == 42
    assert parse_int("  -7  ") == -7


def test_parse_int_returns_none_for_invalid_text() -> None:
    assert parse_int("") is None
    assert parse_int("   ") is None
    assert parse_int("3.14") is None
    assert parse_int("abc") is None
