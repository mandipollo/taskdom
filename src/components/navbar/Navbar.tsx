import React from "react";
import logo from "../../assets/logo.svg";
import NavbarRoutes from "./NavbarRoutes";
import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import NavbarRoutesMobile from "./NavbarRoutesMobile";

const Navbar: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);

	const handlerToggle = (): void => {
		setOpen(!open);
	};

	const classRoutes = `${
		open ? "flex" : "hidden"
	} z-10 absolute top-0 left-0 bottom-0 min-h-screen w-screen  py-1 pt-40 pl-12 space-y-3 text-lg uppercase bg-black text-white`;

	const hamburgerTop = `hamburger-top ${open && "open"}`;
	const hamburgerMiddle = `hamburger-middle ${open && "open"}`;
	const hamburgerBottom = `hamburger-bottom ${open && "open"}`;
	const menu = ` button z-40 block hamburger md:hidden focus:outline-none${
		open && "open"
	}`;
	return (
		<div className="flex flex-1 h-12 p-2  w-full rounded shadow-lg bg-white">
			{/* logo medium screen */}
			<Link to="/">
				<div className="hidden md:flex w-40  justify-center items-center space-x-4 h-full">
					<img src={logo} alt="logo" height={20} width={20} />

					<p className="font-mono text-lg font-thin text-[#4B98F9]">TASKDOM</p>
				</div>
			</Link>

			{/* hamburger button sm */}
			<div className=" md:hidden flex justify-center items-center  h-full">
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
			{/* nav routes */}
			<nav className="flex-1 justify-center items-center h-full">
				{/* logo small screen */}
				<div className=" flex md:hidden w-full  justify-center items-center space-x-4 ">
					<img src={logo} alt="logo" height={30} width={30} />
					<p className="font-mono text-lg font-thin text-[#4B98F9]">TASKDOM</p>
				</div>

				{/* desktop menu */}
				<div className="hidden md:flex flex-1 justify-center items-center h-full">
					<NavbarRoutes />
				</div>
				{/* mobile menu */}
				<div className={classRoutes}>
					<NavbarRoutesMobile />
				</div>
			</nav>

			<div className=" h-full flex w-40  justify-center items-center text-[#4B98F9]">
				<Link to="/login">LOGIN</Link>
			</div>
		</div>
	);
};

export default Navbar;
