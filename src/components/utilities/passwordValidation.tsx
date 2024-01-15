const isPasswordValid = (password: string | null): boolean => {
	if (password === null) {
		return false;
	}

	// Check if the password is at least 6 characters long
	return password.length >= 6;
};

export default isPasswordValid;
