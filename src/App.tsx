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

import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AccountSettingpage from "./pages/AccountSettingpage";
import TeamsPage from "./pages/TeamsPage";
import ChatPage from "./pages/ChatPage";
import ProjectPage from "./pages/ProjectPage";
import TaskPage from "./pages/TaskPage";
import ClientPage from "./pages/ClientPage";
import CalenderPage from "./pages/CalenderPage";
import SupportPage from "./pages/SupportPage";

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
			{ path: "chats", element: <ChatPage /> },
			{ path: "projects", element: <ProjectPage /> },
			{ path: "tasks", element: <TaskPage /> },
			{ path: "clients", element: <ClientPage /> },
			{ path: "calendar", element: <CalenderPage /> },
			{
				path: "support",
				element: <SupportPage />,
			},
		],
	},
]);

function App() {
	return (
		<div className=" flex flex-col items-center h-screen w-screen font-mono bg-[#000408] text-[#E6EDF3]">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RouterProvider router={Route}></RouterProvider>
				</PersistGate>
			</Provider>
		</div>
	);
}

export default App;
