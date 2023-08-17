/**
 * The goal of this exercise is to convert a string to a new string where each character in the new string
 * is "(" if that character appears only once in the original string, or ")" if that character appears more
 * than once in the original string. Ignore capitalization when determining if a character is a duplicate.
 */

pub fn duplicate_encode(word: &str) -> String {
    // let chars: Vec<char> = word.to_lowercase().chars().collect();
    // let result: String = chars
    // 	.iter()
    // 	.map(|&x| {
    // 		if
    // 			chars
    // 				.iter()
    // 				.filter(|&c| *c == x)
    // 				.count() == 1
    // 		{
    // 			'('
    // 		} else {
    // 			')'
    // 		}
    // 	})
    // 	.collect();
    // result

    let word = word.to_lowercase();
    word.chars()
        .map(|c| {
            if word.matches(c).count() == 1 {
                '('
            } else {
                ')'
            }
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn basic_tests() {
        assert_eq!(duplicate_encode("din"), "(((");
        assert_eq!(duplicate_encode("recede"), "()()()");
        assert_eq!(duplicate_encode("Success"), ")())())", "should ignore case");
        assert_eq!(duplicate_encode("(( @"), "))((");
    }
}
