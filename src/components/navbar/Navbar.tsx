import React from "react";
import logo from "../../assets/logo.svg";
import NavbarRoutes from "./NavbarRoutes";
import "./navbar.css";
import { useState } from "react";

import NavbarRoutesMobile from "./NavbarRoutesMobile";

const Navbar: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);

	const handlerToggle = () => {
		setOpen(!open);
	};

	const classRoutes = `${
		open ? "flex" : "hidden"
	} absolute top-0 left-0 bottom-0 min-h-screen w-screen  py-1 pt-40 pl-12 space-y-3 text-lg uppercase bg-black text-white`;

	const hamburgerTop = `hamburger-top ${open && "open"}`;
	const hamburgerMiddle = `hamburger-middle ${open && "open"}`;
	const hamburgerBottom = `hamburger-bottom ${open && "open"}`;
	const menu = ` button z-40 block hamburger md:hidden focus:outline-none${
		open && "open"
	}`;
	return (
		<div className="flex  p-4 w-full rounded shadow-lg">
			<div className="hidden md:flex w-40  justify-center items-center space-x-4 ">
				<img src={logo} alt="logo" height={30} width={30} />
				<p className="font-mono text-lg font-thin text-[#4B98F9]">TASKDOM</p>
			</div>
			<div className=" md:hidden flex ">
				<button
					onClick={handlerToggle}
					id="menu-btn"
					type="button"
					className={menu}
				>
					<span className={hamburgerTop}></span>
					<span className={hamburgerMiddle}></span>
					<span className={hamburgerBottom}></span>
				</button>
			</div>

			<nav className="flex-1 justify-center items-center ">
				<div className=" flex md:hidden w-full  justify-center items-center space-x-4 ">
					<img src={logo} alt="logo" height={30} width={30} />
					<p className="font-mono text-lg font-thin text-[#4B98F9]">TASKDOM</p>
				</div>

				{/* desktop menu */}
				<div className="hidden md:flex flex-1 justify-center items-center ">
					<NavbarRoutes />
				</div>
				{/* mobile menu */}
				<div className={classRoutes}>
					<NavbarRoutesMobile />
				</div>
			</nav>

			<div className="flex w-40 justify-center items-center text-[#4B98F9]">
				Sign in
			</div>
		</div>
	);
};

export default Navbar;
