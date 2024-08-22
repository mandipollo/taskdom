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
				primaryBlue: "#006FC9",
				primaryGreen: "#508D69",
			},

			backgroundImage: {
				"homePage-section":
					"url(https://plus.unsplash.com/premium_photo-1675805016124-86db4b3c4249?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
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
