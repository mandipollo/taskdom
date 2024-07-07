import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
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
			transitionProperty: {
				width: "width",
			},

			colors: {
				darkPrimary: "#000408",
				darkSecondary: "#161B22",
				darkSurface: "#0D1117",
				darkBorder: "#30363E",
				darkText: "#E6EDF3",
				lightPrimary: "#F2F2F2",
				primaryBlue: "#006FC9",
				primaryGreen: "#508D69",
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
