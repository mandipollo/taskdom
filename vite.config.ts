/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			// A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
			include: "**/*.svg?react",
			svgrOptions: {
				icon: true,
				exportType: "named", // Ensure that the SVG is exported as a named component
			},
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		css: true,
	},
});
