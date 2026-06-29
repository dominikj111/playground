"""Collection helpers shared by algorithm exercises."""

from collections.abc import Iterable


def unique_preserving_order[T](items: Iterable[T]) -> list[T]:
    """Return unique items in the order they first appear."""
    seen: set[T] = set()
    result: list[T] = []

    for item in items:
        if item in seen:
            continue
        seen.add(item)
        result.append(item)

    return result
