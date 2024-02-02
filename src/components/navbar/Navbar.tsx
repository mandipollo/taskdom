import React, { useEffect } from "react";
import logo from "../../assets/logo.svg";
import NavbarRoutes from "./NavbarRoutes";
import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../../firebase.config";

import NavbarRoutesMobile from "./NavbarRoutesMobile";
import { User } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { doc, onSnapshot } from "firebase/firestore";
import { setUserFirestoreData } from "../../store/userFirestoreData";
import { userDataProps } from "../utilities/userDataProps";
import avatar from "../../assets/manAvatar.svg";
import SearchNavbar from "./SearchNavbar";

const Navbar: React.FC = () => {
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userFirestoreData);

	const { uid, displayName, profileImage, contactNo, workHours, jobTitle } =
		userState as {
			displayName: string;
			contactNo: string;
			workHours: string | null;
			jobTitle: string | null;
			uid: string;
			profileImage: string;
		};

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
		});

		return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
	}, []);

	const [open, setOpen] = useState<boolean>(false);

	const handlerToggle = (): void => {
		setOpen(!open);
	};

	const mobileClassRoutes = `${
		open ? "flex" : "hidden"
	} z-20 absolute top-0 left-0 bottom-0 h-screen w-screen  py-1 pt-40 pl-12 space-y-3 text-lg uppercase bg-black text-white`;

	const hamburgerTop = `hamburger-top ${open && "open"}`;
	const hamburgerMiddle = `hamburger-middle ${open && "open"}`;
	const hamburgerBottom = `hamburger-bottom ${open && "open"}`;
	const menu = `flex ml-6 button z-40 block hamburger md:hidden focus:outline-none${
		open && "open"
	}`;

	const linkHomeLogo = user ? "/userDashboard" : "/";
	// attach a listener to the firestore database

	useEffect(() => {
		if (auth.currentUser && uid) {
			const dataRef = doc(db, `users/${uid}`);

			const unsubscribe = onSnapshot(dataRef, doc => {
				const data = doc.data() as userDataProps;
				if (data === undefined) return;
				dispatch(setUserFirestoreData(data));
			});

			return () => {
				unsubscribe();
			};
		}
	}, [uid]);

	return (
		<div className="flex flex-1 h-14 p-2  w-full justify-center items-center border-b border-[#30363E] bg-[#000408]">
			{/* logo medium screen */}

			<Link to={linkHomeLogo}>
				<div className="hidden md:flex w-40  justify-center items-center space-x-4 h-full">
					<img src={logo} alt="logo" height={20} width={20} />
					<p className="font-mono text-lg font-thin text-[#508D69]">TASKDOM</p>
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
			<nav className="flex flex-1 justify-center items-center h-full">
				{/* logo small screen */}

				{!user && (
					<div>
						<Link
							to={linkHomeLogo}
							className="flex md:hidden w-full  justify-center items-center space-x-4"
						>
							<img src={logo} alt="logo" height={30} width={30} />
							<p className="font-mono text-lg font-thin text-red-500">
								TASKDOM
							</p>
						</Link>
					</div>
				)}

				{/* desktop menu */}
				{user ? (
					<SearchNavbar
						uid={user.uid}
						profileImage={profileImage}
						displayName={displayName}
						contactNo={contactNo}
						workHours={workHours}
						jobTitle={jobTitle}
					/>
				) : (
					<div className="hidden md:flex flex-1 justify-center items-center h-full">
						<NavbarRoutes />
					</div>
				)}

				{/* mobile menu */}
				<div className={mobileClassRoutes}>
					<NavbarRoutesMobile
						userUid={user?.uid}
						handleToggle={handlerToggle}
					/>
				</div>
			</nav>

			{user ? (
				<Link to="/accountSetting">
					<div className=" h-full flex justify-center items-center space-x-2 hover:cursor-pointer ">
						<p className="sm:block hidden">Hello,</p>
						<p className="font-mono sm:block hidden text-[#508D69]">
							{auth.currentUser?.displayName}
						</p>
						<img
							src={auth.currentUser?.photoURL || avatar}
							height={30}
							width={30}
							className="rounded-full"
						></img>
					</div>
				</Link>
			) : (
				<Link to="/login" className="h-full">
					<button className=" h-full flex w-40 justify-center items-center  rounded-md border-[#30363E] border text-[#E6EDF3]">
						LOGIN
					</button>
				</Link>
			)}
		</div>
	);
};

export default Navbar;
