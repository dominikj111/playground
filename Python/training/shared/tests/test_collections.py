from pyutils.collections import unique_preserving_order


def test_unique_preserving_order_removes_later_duplicates() -> None:
    assert unique_preserving_order(["a", "b", "a", "c", "b"]) == ["a", "b", "c"]


def test_unique_preserving_order_handles_empty_iterable() -> None:
    assert unique_preserving_order([]) == []
