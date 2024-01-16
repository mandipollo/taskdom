import { createBrowserRouter, RouterProvider } from "react-router-dom";

//state
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// pages
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Root from "./pages/Root";
import Contactpage from "./pages/Contactpage";
import Productspage from "./pages/Productspage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";

let persistor = persistStore(store);

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
		<div className="flex flex-col items-center  h-screen w-screen bg-gradient-to-r from-pink-200 to-blue-200 font-mono">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RouterProvider router={Route}></RouterProvider>
				</PersistGate>
			</Provider>
		</div>
	);
}

export default App;
