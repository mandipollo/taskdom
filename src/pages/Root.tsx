import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const Root = () => {
	return (
		<div className="flex relative min-h-screen flex-col  w-full max-w-screen-2xl ">
			<header>
				<Navbar />
			</header>
			<main className="main flex flex-1">
				<div className="flex w-1/6">
					<Sidebar />
				</div>
				<div className="flex flex-1 ">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Root;
