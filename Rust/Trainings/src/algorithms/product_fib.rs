/**
 * The Fibonacci numbers are the numbers in the following integer sequence (Fn):
 * 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * such as
 * F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.
 *
 * Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying
 * F(n) * F(n+1) = prod.
 *
 * Some Examples of Return:
 *
 * productFib(714)
 * should return (21, 34, true), since F(8) = 21, F(9) = 34 and 714 = 21 * 34
 *
 * productFib(800)
 * should return (34, 55, false), since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
 *
 */
use std::sync::atomic::AtomicUsize;
use std::sync::atomic::Ordering;

struct Fibonacci {
    values: Vec<AtomicUsize>,
}

impl Fibonacci {
    const fn new() -> Self {
        Self { values: Vec::new() }
    }

    fn get_or_compute(&mut self, index: usize) -> usize {
        if self.values.is_empty() {
            self.values.push(AtomicUsize::new(0));
            self.values.push(AtomicUsize::new(1));
        }

        while self.values.len() - 1 < index {
            self.values.push(AtomicUsize::new(
                self.values[self.values.len() - 1].load(Ordering::Relaxed)
                    + self.values[self.values.len() - 2].load(Ordering::Relaxed),
            ));
        }

        self.values[index].load(Ordering::Relaxed)
    }
}

use std::sync::Mutex;

static FIBONACCI: Mutex<Fibonacci> = Mutex::new(Fibonacci::new());

fn fib_get(index: usize) -> usize {
    FIBONACCI.lock().unwrap().get_or_compute(index)
}

pub fn product_fib(prod: u64) -> (u64, u64, bool) {
    let mut fibonacci_pointer: usize = 0;

    loop {
        let f1 = fib_get(fibonacci_pointer);
        let f2 = fib_get(fibonacci_pointer + 1);
        let f1f2 = (f1 as u64) * (f2 as u64);

        if f1f2 == prod {
            return (f1 as u64, f2 as u64, true);
        }

        if f1f2 > prod {
            return (f1 as u64, f2 as u64, false);
        }

        fibonacci_pointer += 1;
    }
}

#[cfg(test)]
mod tests {
    use super::{fib_get, product_fib};

    #[test]
    fn fibonacci_struct_api() {
        assert_eq!(fib_get(0), 0);
        assert_eq!(fib_get(1), 1);
        assert_eq!(fib_get(2), 1);
        assert_eq!(fib_get(3), 2);
        assert_eq!(fib_get(4), 3);
        assert_eq!(fib_get(5), 5);
        assert_eq!(fib_get(6), 8);
        assert_eq!(fib_get(7), 13);
        assert_eq!(fib_get(19), 4181);
        assert_eq!(fib_get(15), 610);
        assert_eq!(fib_get(11), 89);
    }

    #[test]
    fn basics_product_fib() {
        #[track_caller]
        fn dotest(prod: u64, exp: (u64, u64, bool)) -> () {
            assert_eq!(product_fib(prod), exp)
        }

        dotest(4895, (55, 89, true));
        dotest(5895, (89, 144, false));
    }
}
