pub mod narcissistic_numbers;
pub use narcissistic_numbers::narcissistic;

pub mod duplicate_encode;
pub use duplicate_encode::duplicate_encode;

pub mod break_camelcase;
pub use break_camelcase::break_camelcase;

pub mod good_vs_evil;
pub use good_vs_evil::good_vs_evil;

pub mod two_sum;
pub use two_sum::two_sum;

pub mod product_fib;
pub use product_fib::product_fib;

pub mod are_two_arrays_same;
pub fn are_two_arrays_same(a: Vec<i64>, b: Vec<i64>) -> bool {
    return are_two_arrays_same::comp(a, b);
}
