#[inline]
pub fn zeros_matrix_my_version(matrix: &mut Vec<Vec<i32>>) {
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

#[inline]
pub fn zeros_matrix_ai_version(matrix: &mut Vec<Vec<i32>>) {
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
