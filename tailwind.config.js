import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["ui-sans-serif", "system-ui"],
			serif: ["ui-serif", "Georgia"],
			mono: ["ui-monospace", "SFMono-Regular"],
			ephesis: ["Ephesis", "sans-serif"],
			montserrat: ["Montserrat", "sans-serif"],
		},

		extend: {
			keyframes: {
				shine: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
			},
			animation: {
				shine: "shine 2s linear forwards",
			},
		},
	},
	variants: {
		extend: {
			breakInside: ["responsive"],
		},
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				".break-inside-avoid": {
					breakInside: "avoid",
				},
			};
			addUtilities(newUtilities, ["responsive"]);
		},
	],
};
