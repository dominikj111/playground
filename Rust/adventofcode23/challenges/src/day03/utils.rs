/// The value of the element.
/// It is not well defined as to get the char value I need to do `character_element.value.as_type::<u32>() as u8 as char`.
/// Because the value may causes overflow the `struct` is the better option here.
/// Enum values should be transferable to each other, perhaps.
#[derive(Debug, Clone)]
pub enum Value {
    Number(u32),
    Char(char),
}

impl PartialEq for Value {
    fn eq(&self, other: &Self) -> bool {
        match (self, other) {
            (Value::Number(a), Value::Number(b)) => a == b,
            (Value::Char(a), Value::Char(b)) => a == b,
            _ => false,
        }
    }
}

impl Value {
    fn as_type<T>(&self) -> T
    where
        T: From<u32> + From<char>,
    {
        match self {
            Value::Number(n) => T::from(*n),
            Value::Char(c) => T::from(*c),
        }
    }
}

#[derive(Debug)]
pub struct Element {
    pub value: Value,
    pub start: u32,
    pub end: u32,
}

impl PartialEq for Element {
    fn eq(&self, other: &Self) -> bool {
        self.value == other.value && self.start == other.start && self.end == other.end
    }
}

impl Clone for Element {
    fn clone(&self) -> Self {
        Element {
            value: self.value.clone(),
            start: self.start,
            end: self.end,
        }
    }
}

/// Map a sentence line into pair of Vec<Element> object containing numbers and symbols in provided line.
///
/// # Example
/// ```
/// assert_eq!(
///     map_line("12...3..@"),
///     (
///         vec![Element{value: Value::Number(12), start: 0, end: 1}, Element{value: Value::Number(3), start: 5, end: 5}],
///         vec![Element{value: Value::Char('@'), start: 8, end: 8}]
///     )
/// );
/// ```
pub fn map_line(sentence: &str) -> (Vec<Element>, Vec<Element>) {
    let mut result: (Vec<Element>, Vec<Element>) = (Vec::new(), Vec::new());
    let mut previous_char_is_digit = false;
    for (i, c) in sentence.chars().enumerate() {
        if c.is_ascii_digit() && previous_char_is_digit {
            let previous_record = result.0.last_mut().unwrap();
            let combined = previous_record.value.as_type::<u32>().to_string() + &c.to_string();
            previous_record.value = Value::Number(combined.parse().unwrap());
            previous_record.end = i as u32;
        }
        if c.is_ascii_digit() && !previous_char_is_digit {
            result.0.push(Element {
                value: Value::Number(c.to_digit(10).unwrap()),
                start: (i as u32),
                end: (i as u32),
            });
        }
        if !c.is_ascii_digit() && c != '.' {
            result.1.push(Element {
                value: Value::Char(c),
                start: (i as u32),
                end: (i as u32),
            });
        }
        previous_char_is_digit = c.is_ascii_digit();
    }
    result
}

/// Accept a window of 3 lines and return a vector of numbers that are marked in the window's middle line.
/// The number's marker is any non numeric character except the dot "." in the boundaries surrounding the number.
///
/// # Example
/// ```
/// assert_eq!(
///     get_marked_numbers(&vec![
///         "......#...".to_string(),
///         "617*......".to_string(),
///         ".....+.58.".to_string()
///     ]),
///     vec![617]
/// );
/// ```
pub fn get_marked_numbers(window: &Vec<String>) -> Vec<u32> {
    let mapped_line_a = map_line(window[0].as_str());
    let mapped_line_b = map_line(window[1].as_str());
    let mapped_line_c = map_line(window[2].as_str());

    let mut markers: Vec<Element> = vec![];
    let mut result: Vec<u32> = vec![];

    markers.extend(mapped_line_a.1);
    markers.extend(mapped_line_b.1);
    markers.extend(mapped_line_c.1);

    for number_element in mapped_line_b.0 {
        let window_range = (
            if number_element.start == 0 {
                0
            } else {
                number_element.start - 1
            },
            number_element.end + 1,
        );

        if markers
            .iter()
            .any(|marker| marker.start >= window_range.0 && marker.end <= window_range.1)
        {
            result.push(number_element.value.as_type::<u32>());
        }
    }

    result
}

/// Accept a window of 3 lines and return a vector of numbers that are marked in the window's middle line by specific character.
/// The number's marker is specific character except the dot "." in the boundaries surrounding the number.
///
/// # Example
/// ```
/// assert_eq!(
///     get_ratios_tied_by('*', &vec![
///         "467..114..".to_string(),
///         "...*......".to_string(),
///         "..35..633.".to_string()
///     ]),
///     vec![467, 35]
/// );
/// ```
pub fn get_ratios_tied_by(character: char, window: &Vec<String>) -> Vec<(u32, u32)> {
    let mapped_line_a = map_line(window[0].as_str());
    let mapped_line_b = map_line(window[1].as_str());
    let mapped_line_c = map_line(window[2].as_str());

    let mut numbers: Vec<Element> = vec![];
    let mut result: Vec<(u32, u32)> = vec![];

    numbers.extend(mapped_line_a.0);
    numbers.extend(mapped_line_b.0);
    numbers.extend(mapped_line_c.0);

    for character_element in mapped_line_b.1 {
        let character_value: char = character_element.value.as_type::<u32>() as u8 as char;

        if character_value != character {
            continue;
        }

        let tied_numbers: Vec<&Element> = numbers.iter().filter(|x| {
            let window_range = (if x.start == 0 { 0 } else { x.start - 1 }, x.end + 1);
            character_element.start >= window_range.0 && character_element.end <= window_range.1
        }).collect();

        if tied_numbers.len() == 2 {
            result.push((
                tied_numbers[0].value.as_type::<u32>(),
                tied_numbers[1].value.as_type::<u32>(),
            ));
        }
    }

    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn map_line_test() {
        assert_eq!(
            map_line("12...3..@"),
            (
                vec![
                    Element {
                        value: Value::Number(12),
                        start: 0,
                        end: 1
                    },
                    Element {
                        value: Value::Number(3),
                        start: 5,
                        end: 5
                    }
                ],
                vec![Element {
                    value: Value::Char('@'),
                    start: 8,
                    end: 8
                }]
            )
        );
        assert_eq!(
            map_line("..35..633."),
            (
                vec![
                    Element {
                        value: Value::Number(35),
                        start: 2,
                        end: 3
                    },
                    Element {
                        value: Value::Number(633),
                        start: 6,
                        end: 8
                    }
                ],
                vec![]
            )
        );
        assert_eq!(
            map_line("...$.*...."),
            (
                vec![],
                vec![
                    Element {
                        value: Value::Char('$'),
                        start: 3,
                        end: 3
                    },
                    Element {
                        value: Value::Char('*'),
                        start: 5,
                        end: 5
                    }
                ]
            )
        );
    }

    #[test]
    fn get_marked_numbers_test() {
        assert_eq!(
            get_marked_numbers(&vec![
                "......#...".to_string(),
                "617*......".to_string(),
                ".....+.58.".to_string()
            ]),
            vec![617]
        );
        assert_eq!(
            get_marked_numbers(&vec![
                "......#...".to_string(),
                "617*..3.£.".to_string(),
                ".....+.58.".to_string()
            ]),
            vec![617, 3]
        );
        assert_eq!(
            get_marked_numbers(&vec![
                "..........".to_string(),
                "617*..3.£.".to_string(),
                ".......58.".to_string()
            ]),
            vec![617]
        );
    }

    #[test]
    fn get_numbers_marked_by_test() {
        assert_eq!(
            get_ratios_tied_by(
                '*',
                &vec![
                    "467..114..".to_string(),
                    "...*......".to_string(),
                    "..35..633.".to_string()
                ]
            ),
            vec![(467, 35)]
        );
        assert_eq!(
            get_ratios_tied_by(
                '*',
                &vec![
                    ".....114..".to_string(),
                    "..2*1.....".to_string(),
                    "......633.".to_string()
                ]
            ),
            vec![(2, 1)]
        );
        assert_eq!(
            get_ratios_tied_by(
                '*',
                &vec![
                    "...*.3.+.*".to_string(),
                    "..35.*633.".to_string(),
                    "".to_string(),
                ]
            ),
            vec![(3, 633)]
        );
        assert_eq!(
            get_ratios_tied_by(
                '*',
                &vec![
                    "467..114..".to_string(),
                    "...*.3.+.*".to_string(),
                    "..35.*633.".to_string()
                ]
            ),
            vec![(467, 35)]
        );
        assert_eq!(
            get_ratios_tied_by(
                '*',
                &vec![
                    "467..114..".to_string(),
                    "...*3..+.*".to_string(),
                    "..35.*633.".to_string()
                ]
            ),
            vec![]
        );
        assert_eq!(
            get_ratios_tied_by(
                '*',
                &vec![
                    "467..114.2".to_string(),
                    "...*3..+.*".to_string(),
                    "..35.*633.".to_string()
                ]
            ),
            vec![(2, 633)]
        );
    }
}
