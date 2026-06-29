"""Filesystem helpers shared by CLI and file exercises."""

from pathlib import Path


def read_text(path: str | Path) -> str:
    """Read UTF-8 text from a path."""
    return Path(path).read_text(encoding="utf-8")


def write_text(path: str | Path, content: str) -> None:
    """Write UTF-8 text to a path, creating parent directories if needed."""
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")
