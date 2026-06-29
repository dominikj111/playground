from pyutils.strings import normalize_words


def test_normalize_words_extracts_lowercase_words() -> None:
    assert normalize_words("Hello, WORLD! It's Python.") == [
        "hello",
        "world",
        "it's",
        "python",
    ]


def test_normalize_words_handles_empty_text() -> None:
    assert normalize_words("") == []
