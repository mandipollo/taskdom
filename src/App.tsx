import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Root from "./pages/Root";
import Contactpage from "./pages/Contactpage";
import Productspage from "./pages/Productspage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";

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
			{
				path: "contact",
				element: <Contactpage />,
			},
			{
				path: "products",
				element: <Productspage />,
			},
			{ path: "login", element: <Loginpage /> },
			{
				path: "signup",
				element: <Signuppage />,
			},
		],
	},
]);

function App() {
	return (
		<div className="flex flex-col items-center h-screen w-screen bg-gradient-to-r from-pink-200 to-blue-200 font-mono">
			<RouterProvider router={Route}></RouterProvider>
		</div>
	);
}

export default App;
