/**
 * Given two arrays a and b write a function comp(a, b) (or compSame(a, b)) that checks whether the two arrays have the "same" elements,
 * with the same multiplicities (the multiplicity of a member is the number of times it appears). "Same" means, here,
 * that the elements in b are the elements in a squared, regardless of the order.
 *
 * Examples
 *
 * Valid arrays
 * a = [121, 144, 19, 161, 19, 144, 19, 11]
 * b = [121, 14641, 20736, 361, 25921, 361, 20736, 361]
 *
 * comp(a, b) returns true because in b
 * 121 is the square of 11, 14641 is the square of 121, 20736 the square of 144, 361 the square of 19, 25921 the square of 161, and so on.
 *
 * It gets obvious if we write b's elements in terms of squares:
 * a = [121, 144, 19, 161, 19, 144, 19, 11]
 * b = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19]
 *
 * Invalid arrays
 * If, for example, we change the first number to something else, comp is not returning true anymore:
 *
 * a = [121, 144, 19, 161, 19, 144, 19, 11]
 * b = [132, 14641, 20736, 361, 25921, 361, 20736, 361]
 *
 * comp(a,b) returns false because in b 132 is not the square of any number of a.
 *
 * a = [121, 144, 19, 161, 19, 144, 19, 11]
 * b = [121, 14641, 20736, 36100, 25921, 361, 20736, 361]
 * comp(a,b) returns false because in b 36100 is not the square of any number of a.
 * Remarks
 * a or b might be [] or {}.
 * a or b might be nil or null or None or nothing.
 *
 * If a or b are nil (or null or None, depending on the language), the problem doesn't make sense so return false.
 */

pub fn comp(a: Vec<i64>, b: Vec<i64>) -> bool {
    let mut b_processed_indexes: Vec<Option<usize>> = vec![];

    for a_value in a {
        let b_square_index = b.iter().enumerate().position(|(index, x)| {
            x == &(a_value * a_value) && !b_processed_indexes.contains(&Some(index))
        });

        if b_square_index.is_none() {
            return false;
        }

        b_processed_indexes.push(b_square_index);
    }

    b_processed_indexes.len() == b.len()

    // NOTE: not my clever solution
    // let mut a1 = a.iter().map(|&x| x * x).collect::<Vec<_>>();
    // let mut a2 = b;
    // a1.sort();
    // a2.sort();
    // a1 == a2
}

#[test]
fn tests_comp() {
    fn testing(a: Vec<i64>, b: Vec<i64>, exp: bool) -> () {
        assert_eq!(comp(a, b), exp)
    }

    let a1 = vec![11];
    let a2 = vec![11 * 11, 12 * 12];
    testing(a1, a2, false);

    let a1 = vec![14, 12];
    let a2 = vec![12 * 12, 14 * 14];
    testing(a1, a2, true);

    let a1 = vec![121, 144, 19, 161, 19, 144, 19, -11];
    let a2 = vec![
        11 * 11,
        121 * 121,
        144 * 144,
        19 * 19,
        161 * 161,
        19 * 19,
        144 * 144,
        19 * 19,
    ];
    testing(a1, a2, true);

    let a1 = vec![121, 144, -19, 161, 19, 144, 19, 11];
    let a2 = vec![
        11 * -11,
        121 * 121,
        144 * 144,
        -19 * -19,
        161 * 161,
        19 * 19,
        144 * 144,
        19 * 19,
    ];
    testing(a1, a2, false);

    let a1 = vec![121, 144, -19, 161, 19, 144, 19, 11];
    let a2 = vec![
        11 * 21,
        121 * 121,
        144 * 144,
        -19 * -19,
        161 * 161,
        19 * 19,
        144 * 144,
        19 * 19,
    ];
    testing(a1, a2, false);
}
