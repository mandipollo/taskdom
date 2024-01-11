import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Root from "./pages/Root";

const Route = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <Homepage />,
			},
			{
				path: "about",
				element: <Aboutpage />,
			},
		],
	},
]);

function App() {
	return (
		<div className="flex">
			<RouterProvider router={Route}></RouterProvider>
		</div>
	);
}

export default App;
