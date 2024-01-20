import { render, screen } from "@testing-library/react";
import About from "./About";

test("renders the heading", () => {
	// render
	render(<About />);
	// find the element

	const element = screen.getByRole("heading", { name: /about/i });

	//assertions

	expect(element).toBeInTheDocument();
});
