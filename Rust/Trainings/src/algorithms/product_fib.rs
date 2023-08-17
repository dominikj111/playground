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

struct Fibonacci {
    values: Vec<usize>,
}

impl Fibonacci {
    fn get(&mut self, index: usize) -> usize {
        if self.values.is_empty() {
            self.values.push(0);
            self.values.push(1);
        }

        while self.values.len() - 1 < index {
            self.values
                .push(self.values[self.values.len() - 1] + self.values[self.values.len() - 2]);
        }

        self.values[index]
    }
}

/*

NOTE: this code is correct but fails time to time when testing, that is because tests are multithreaded

static mut FIBONACCI: Fibonacci = Fibonacci {
    values: vec![],
};

pub fn product_fib(prod: u64) -> (u64, u64, bool) {
    let mut fibonacci_pointer: usize = 0;

    unsafe {
        loop {
            let (f1, _) = FIBONACCI.get(fibonacci_pointer);
            let (f2, _) = FIBONACCI.get(fibonacci_pointer + 1);
            let f1f2 = f1 as u64 * f2 as u64;

            if f1f2 == prod {
                return (f1 as u64, f2 as u64, true);
            }

            if f1f2 > prod {
                return (f1 as u64, f2 as u64, false);
            }

            fibonacci_pointer += 1;
        }
    }
}
*/

use std::sync::{Mutex, Once};

static mut FIBONACCI: Option<Mutex<Fibonacci>> = None;
static INIT: Once = Once::new();

fn fib_get(index: usize) -> usize {
    INIT.call_once(|| unsafe {
        FIBONACCI = Some(Mutex::new(Fibonacci { values: vec![] }));
    });
    unsafe { FIBONACCI.as_mut().unwrap().get_mut().unwrap().get(index) }
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
    fn dotest(prod: u64, exp: (u64, u64, bool)) -> () {
        assert_eq!(product_fib(prod), exp)
    }

    dotest(4895, (55, 89, true));
    dotest(5895, (89, 144, false));
}
