import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect, useState } from "react";

import { auth, db } from "../../firebase.config";
import { useAppDispatch, useAppSelector } from "../store/store";

import { DocumentSnapshot, doc, onSnapshot } from "firebase/firestore";
import { UserDataProps } from "../components/utilities/userDataProps";
import {
	resetUserFirestoreData,
	setUserFirestoreData,
} from "../store/userFirestoreData";
import DropDown from "../components/navbar/DropDown";
import { onAuthStateChanged } from "firebase/auth";
import Snackbar from "../components/utilities/Snackbar";

const Root = () => {
	const snackBarState = useAppSelector(state => state.snackBar);
	// drop down menu

	const [isDropDown, setIsDropDown] = useState<boolean>(false);

	const handleDropDown = () => {
		setIsDropDown(!isDropDown);
	};
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.userFirestoreData);

	// set up a listener for firestore data linked to user

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, user => {
			if (user) {
				const uid = user.uid;
				const dataRef = doc(db, `users/${uid}`);
				const unsubscribeSnapshot = onSnapshot(
					dataRef,
					(doc: DocumentSnapshot) => {
						if (doc.exists()) {
							const data = doc.data() as UserDataProps;
							dispatch(setUserFirestoreData(data));
						}
					}
				);

				// Return a cleanup function to unsubscribe from snapshot listener
				return () => unsubscribeSnapshot();
			} else {
				// Handle case when user is not logged in or user logs out
				dispatch(resetUserFirestoreData());
			}
		});

		// Return a cleanup function to unsubscribe from auth listener
		return () => unsubscribeAuth();
	}, [dispatch]);

	return (
		<div className="flex relative h-screen flex-col w-full ">
			<header className="sticky top-0 ">
				<Navbar handleDropDown={handleDropDown} />
			</header>
			<main
				className="flex flex-1 "
				style={{ maxHeight: " calc( 100vh - 3.5rem )" }}
			>
				{isDropDown && <DropDown handleDropDown={handleDropDown} />}

				{userState.uid && (
					<div className="flex">
						<Sidebar />
					</div>
				)}

				<div className="flex flex-1 ">
					<Snackbar message={snackBarState.message} show={snackBarState.show} />
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Root;
