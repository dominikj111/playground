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
    pub fn as_type<T>(&self) -> T
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




