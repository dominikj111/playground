use template_package_name::utils::greetings::you_are_the_best;

#[test]
fn test_you_are_the_best() {
	assert_eq!(you_are_the_best("Alice"), "  You are the BEST! Alice ...  ");
	assert_eq!(you_are_the_best("Bob"), "  You are the BEST! Bob ...  ");
}
