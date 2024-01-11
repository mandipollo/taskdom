import { Outlet } from "react-router-dom";
import Navbar from "../assets/components/navbar/Navbar";

const Root = () => {
	return (
		<div className="flex">
			<header>
				<Navbar />
			</header>
			<div className="flex">
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
