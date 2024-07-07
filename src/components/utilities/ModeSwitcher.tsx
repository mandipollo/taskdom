import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
const Modeswitcher = () => {
	// State to track the current theme
	const [isDarkMode, setDarkMode] = useState<string>(
		() => localStorage.getItem("theme") || "light"
	);

	// Add default theme to local storage if not set
	localStorage.theme ? null : localStorage.setItem("theme", "light");

	// Function to toggle dark mode
	const toggleDarkMode = () => {
		const newTheme = isDarkMode === "light" ? "dark" : "light";
		setDarkMode(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	// Apply dark mode styles based on local storage or system preference
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}

	// Return the DarkModeSwitch component
	return (
		<DarkModeSwitch
			sunColor="yellow"
			checked={isDarkMode === "dark"}
			onChange={toggleDarkMode}
			size={20}
		/>
	);
};

export default Modeswitcher;
