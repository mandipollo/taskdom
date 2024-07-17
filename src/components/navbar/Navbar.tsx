import React, { useEffect } from "react";

import { Logo } from "../../assets/logos/Logo";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, db } from "../../../firebase.config";

import { User } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { doc, onSnapshot } from "firebase/firestore";
import { setUserFirestoreData } from "../../store/userFirestoreData";
import { UserDataProps } from "../utilities/userDataProps";
import SearchConnections from "./SearchConnections";
import Modeswitcher from "../utilities/ModeSwitcher";

interface NavbarProps {
	handleDropDown: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ handleDropDown }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { pathname } = useLocation();

	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userFirestoreData);

	const { uid, displayName, profileImage, workHours, contactNo, jobTitle } =
		userState;

	const defaultPic = displayName?.charAt(0).toUpperCase() || profileImage;
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		setIsLoading(true);
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
			setIsLoading(false);
		});

		return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
	}, []);

	const linkHomeLogo = user ? "/userDashboard" : "/";
	// attach a listener to the firestore database

	useEffect(() => {
		if (auth.currentUser && uid) {
			const dataRef = doc(db, `users/${uid}`);

			const unsubscribe = onSnapshot(dataRef, doc => {
				const data = doc.data() as UserDataProps;
				if (data === undefined) return;
				dispatch(setUserFirestoreData(data));
			});

			return () => {
				unsubscribe();
			};
		}
	}, [uid]);

	return (
		<div className="flex relative justify-between flex-1 h-14 p-2 space-x-2  w-full  items-center border-b dark:border-darkBorder bg-primaryBlue dark:bg-darkPrimary ">
			<Link
				to={linkHomeLogo}
				className=" md:flex w-10  justify-center items-center space-x-4 h-full"
			>
				<Logo height={20} width={20} className="text-green-400" />
			</Link>
			{/* nav routes */}
			{pathname === "/teams" && (
				<SearchConnections
					uid={uid}
					profileImage={profileImage}
					workHours={workHours}
					jobTitle={jobTitle}
					displayName={displayName}
					contactNo={contactNo}
					defaultPic={defaultPic}
				/>
			)}

			{!isLoading && (
				<div className="flex gap-1 justify-center items-center">
					{user && <Modeswitcher />}

					{user && (
						<div
							onClick={() => handleDropDown()}
							className=" h-full flex justify-center items-center space-x-2 hover:cursor-pointer "
						>
							{auth.currentUser?.photoURL ? (
								<img
									src={auth.currentUser?.photoURL}
									className="rounded-full w-8 h-8 object-cover border border-gray-400"
								></img>
							) : (
								<span className=" flex justify-center items-center rounded-full bg-gray-300 h-8 w-8 p-2 text-black">
									{defaultPic}
								</span>
							)}
						</div>
					)}

					{!user && (
						<Link to="/login" className=" h-10">
							<button className=" h-full flex w-20 sm:w-40 justify-center items-center  rounded-md  border text-darkText">
								LOGIN
							</button>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};

export default Navbar;
