import { createBrowserRouter, RouterProvider } from "react-router-dom";

//state
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// pages
import Homepage from "./pages/Homepage";
import Root from "./pages/Root";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AccountSettingpage from "./pages/AccountSettingpage";
import TeamsPage from "./pages/TeamsPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectsHomePage from "./pages/ProjectsHomePage";
import RequestPage from "./pages/RequestPage";

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

			{ path: "login", element: <Loginpage /> },
			{
				path: "signup",
				element: <Signuppage />,
			},
			{
				path: "userDashboard",
				element: <UserDashboardPage />,
			},
			{
				path: "accountSetting",
				element: <AccountSettingpage />,
			},
			{
				path: "teams",
				element: <TeamsPage />,
			},
			{ path: "connectionRequest", element: <RequestPage /> },

			{
				path: "projects",
				element: <ProjectsHomePage />,
			},
			{ path: "projects/:projectId", element: <ProjectPage /> },
		],
	},
]);

function App() {
	return (
		<div className="  flex flex-col items-center h-screen w-screen text-white  font-mono bg-darkPrimary ">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RouterProvider router={Route}></RouterProvider>
				</PersistGate>
			</Provider>
		</div>
	);
}

export default App;
