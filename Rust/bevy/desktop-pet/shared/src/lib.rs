use rand::Rng;

/// Generates a random f32 number between min and max (inclusive)
pub fn random_float(min: f32, max: f32) -> f32 {
    let mut rng = rand::thread_rng();
    rng.gen_range(min..=max)
}

/// Generates a random i32 number between min and max (inclusive)
pub fn random_int(min: i32, max: i32) -> i32 {
    let mut rng = rand::thread_rng();
    rng.gen_range(min..=max)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_random_float_in_range() {
        let min = 0.0;
        let max = 10.0;
        let value = random_float(min, max);
        assert!(value >= min && value <= max);
    }

    #[test]
    fn test_random_int_in_range() {
        let min = 0;
        let max = 10;
        let value = random_int(min, max);
        assert!(value >= min && value <= max);
    }
}
