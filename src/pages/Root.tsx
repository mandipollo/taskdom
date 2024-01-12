import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Root = () => {
	return (
		<div className="flex flex-col w-full max-w-6xl ">
			<header>
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
