const isValidEmail = (email: string | null): boolean => {
	if (email === null) {
		return false;
	}
	// Regular expression for basic email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export default isValidEmail;
