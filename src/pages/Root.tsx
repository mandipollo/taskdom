import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Root = () => {
	return (
		<div className="flex relative min-h-screen flex-col  w-full max-w-screen-2xl ">
			<header>
				<Navbar />
			</header>
			<main className="main flex flex-1 flex-col">
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
