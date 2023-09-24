use std::collections::HashMap;

/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * You can return the answer in any order
 *
 * Example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 *
 * https://dev.to/pahujanayan/100-days-day-1-5b46
 */
pub fn two_sum_100(numbers: &[isize], target: &isize) -> Option<(usize, usize)> {
    let mut hashmap = HashMap::new();

    for (index, num) in numbers.iter().enumerate() {
        // Dereferenced value may be more performant in some cases but it dependeds on specific context, architecture and so on.
        // Worth to benchmark it in specidic use case if needed.
        let copyied_num = *num;
        let complement = target - copyied_num;

        if let Some(complement_index) = hashmap.get(&complement) {
            return Some((*complement_index, index));
        } else {
            hashmap.insert(copyied_num, index);
        }
    }

    None
}

/**
 * Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's.
 * You must do it in place.
 *
 * Example:
 * Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * Output: [[1,0,1],[0,0,0],[1,0,1]]
 *
 * https://dev.to/pahujanayan/100-days-day-2-11g
 * 
 * According to the Criterion.rs benchmark, both example are equal in performance.
 */
pub fn set_matrix_zeroes(matrix: &mut Vec<Vec<i32>>) {
    let zeros_in_row = vec![0; matrix[0].len()];
    let mut columns_to_zero: Vec<usize> = Vec::new();
    let mut clear_row = false;

    for row in matrix.iter_mut() {
        for (column_idx, matrix_item_in_row) in row.iter().enumerate() {
            if *matrix_item_in_row == 0 {
                if !columns_to_zero.contains(&column_idx) {
                    columns_to_zero.push(column_idx);
                }
                clear_row = true;
            }
        }

        if clear_row {
            row.clone_from_slice(&zeros_in_row);
            clear_row = false;
        }
    }

    for row in matrix {
        for column_index_to_clear in &columns_to_zero {
            row[*column_index_to_clear] = 0;
        }
    }
}

pub fn set_matrix_zeroes_ai_version(matrix: &mut Vec<Vec<i32>>) {
    let rows = matrix.len();
    let cols = matrix[0].len();
    let mut zero_rows = vec![false; rows];
    let mut zero_cols = vec![false; cols];

    // Find the rows and columns with zeros
    for i in 0..rows {
        for j in 0..cols {
            if matrix[i][j] == 0 {
                zero_rows[i] = true;
                zero_cols[j] = true;
            }
        }
    }

    // Set rows with zeros to all zeros
    for i in 0..rows {
        if zero_rows[i] {
            for j in 0..cols {
                matrix[i][j] = 0;
            }
        }
    }

    // Set columns with zeros to all zeros
    for j in 0..cols {
        if zero_cols[j] {
            for i in 0..rows {
                matrix[i][j] = 0;
            }
        }
    }
}

/**
 * Given an integer numRows, return the first numRows of Pascal's triangle.
 * In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
 *
 * Example:
 * Input: numRows = 5
 * Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 *
 * This problem is available in three types of variations.
 * Variation 1: Given row number r and column number c. Print the element at position (r, c) in Pascal’s triangle.
 * Variation 2: Given the row number n. Print the n-th row of Pascal’s triangle.
 * Variation 3: Given the number of rows n. Print the first n rows of Pascal’s triangle.
 *
 * https://dev.to/pahujanayan/100-days-day-3-n24
 */
pub fn get_pascal_triangle(n: usize) -> Vec<Vec<i32>> {
    todo!();
}

/**
 * Given an array A[] consisting of only 0s, 1s, and 2s. The task is to write a function that sorts the given array. The functions should put all 0s first, then all 1s and all 2s in last.
 * This problem is also the same as the famous “Dutch National Flag problem”. The problem was proposed by Edsger Dijkstra. The problem is as follows:
 *
 * Example:
 * Input: {0, 1, 2, 0, 1, 2}
 * Output: {0, 0, 1, 1, 2, 2}
 *
 * https://dev.to/pahujanayan/100-days-day-4-48ch
 */
pub fn dutch_national_flag_algorithm(matrix: &mut Vec<Vec<i32>>) {
    todo!();
}

/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 *
 * Example:
 *
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation:
 * Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 * Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
 *
 * https://dev.to/pahujanayan/100-days-day-5-4p6a
 */
pub fn best_time_to_buy_and_sell_stock(prices: &mut Vec<i32>) {
    todo!();
}

/**
 * You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
 * You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
 * DO NOT allocate another 2D matrix and do the rotation.
 *
 * Example:
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[7,4,1],[8,5,2],[9,6,3]]
 *
 * https://dev.to/pahujanayan/100-days-day-5ii-5340
 */
pub fn rotate_image(matrix: &mut Vec<Vec<i32>>) {
    todo!();
}

#[cfg(test)]
mod tests {
    #[test]
    fn two_sum_100_test() {
        assert_eq!(super::two_sum_100(&[1, 2, 6, 8], &10), Some((1, 3)));
        assert_eq!(super::two_sum_100(&[1, -2, 6, 8], &-1), Some((0, 1)));
        assert_eq!(super::two_sum_100(&[1, -2, 6, 3], &1), Some((1, 3)));
    }

    #[test]
    fn set_matrix_zeroes_test() {
        let mut matrix = vec![vec![1, 1, 1], vec![1, 0, 1], vec![1, 1, 1]];
        let mut matrix_ai = vec![vec![1, 1, 1], vec![1, 0, 1], vec![1, 1, 1]];
        super::set_matrix_zeroes(&mut matrix);
        super::set_matrix_zeroes_ai_version(&mut matrix_ai);

        assert_eq!(matrix, vec![vec![1, 0, 1], vec![0, 0, 0], vec![1, 0, 1],]);
        assert_eq!(matrix_ai, vec![vec![1, 0, 1], vec![0, 0, 0], vec![1, 0, 1],]);

        let mut matrix2 = vec![vec![1, 1, 1], vec![0, 1, 0], vec![1, 1, 1]];
        let mut matrix2_ai = vec![vec![1, 1, 1], vec![0, 1, 0], vec![1, 1, 1]];
        super::set_matrix_zeroes(&mut matrix2);
        super::set_matrix_zeroes_ai_version(&mut matrix2_ai);

        assert_eq!(matrix2, vec![vec![0, 1, 0], vec![0, 0, 0], vec![0, 1, 0],]);
        assert_eq!(matrix2_ai, vec![vec![0, 1, 0], vec![0, 0, 0], vec![0, 1, 0],]);
    }

    #[test]
    fn get_pascal_triangle_test() {
        todo!();
    }

    #[test]
    fn dutch_national_flag_algorithm_test() {
        todo!();
    }

    #[test]
    fn best_time_to_buy_and_sell_stock_test() {
        todo!();
    }

    #[test]
    fn rotate_image_test() {
        todo!();
    }
}
