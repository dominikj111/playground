"""String helpers shared by text-oriented exercises."""

import re

_WORD_RE = re.compile(r"[\w']+")


def normalize_words(text: str) -> list[str]:
    """Return lowercase words extracted from text."""
    return [match.group(0).lower() for match in _WORD_RE.finditer(text)]
