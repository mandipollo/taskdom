import React, { useEffect } from "react";
import logo from "../../assets/logo.svg";
import NavbarRoutes from "./NavbarRoutes";
import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase.config";

import NavbarRoutesMobile from "./NavbarRoutesMobile";
import { User } from "firebase/auth";
import manAvatar from "../../assets/manAvatar.svg";

const Navbar: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
			setIsLoading(false); // Set loading to false once user data is retrieved
		});

		return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
	}, []);

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
		<div className="flex flex-1 h-14 p-2  w-full rounded shadow-lg bg-white">
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
					<NavbarRoutes email={user?.email} />
				</div>
				{/* mobile menu */}
				<div className={classRoutes}>
					<NavbarRoutesMobile
						userUid={user?.uid}
						handleToggle={handlerToggle}
					/>
				</div>
			</nav>

			{isLoading ? (
				<div className="flex justify-center items-center">
					<p>Loading...</p>
				</div>
			) : user ? (
				<div className=" h-full flex justify-center items-center space-x-2  ">
					<p className="sm:block hidden">Hello,</p>
					<p className="font-mono sm:block hidden text-[#4B98F9]">
						{user.displayName}
					</p>
					<img
						src={manAvatar}
						height={30}
						width={30}
						className="rounded-full sm:hidden block"
					></img>
				</div>
			) : (
				<button className=" h-full flex w-40 justify-center items-center bg-black   text-white rounded-md">
					<Link to="/login">LOGIN</Link>
				</button>
			)}
		</div>
	);
};

export default Navbar;
