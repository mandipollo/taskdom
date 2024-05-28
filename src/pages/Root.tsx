import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";
import { resetUser, setUser } from "../store/authSlice";
import { auth, db } from "../../firebase.config";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetUserChat } from "../store/chatSlice";

import { DocumentSnapshot, doc, onSnapshot } from "firebase/firestore";
import { UserDataProps } from "../components/utilities/userDataProps";
import { setUserFirestoreData } from "../store/userFirestoreData";
const Root = () => {
	const dispatch = useAppDispatch();
	const userState = useAppSelector(state => state.auth);

	// sets a listener for current user state
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				dispatch(
					setUser({
						displayName: user.displayName,
						email: user.email,
						uid: user.uid,
						photoURL: user.photoURL || undefined,
					})
				);
			} else {
				// User signed out, reset the user state and chat state
				dispatch(resetUser());
				dispatch(resetUserChat());
			}
		});

		return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
	}, [dispatch]);

	// set up a listener for firestore data linked to user

	useEffect(() => {
		const fetchData = async () => {
			// Call userFirestoreUpdate when the component mounts
			const dataRef = doc(db, `users/${userState.uid}`);
			const unsubscribe = onSnapshot(dataRef, (doc: DocumentSnapshot) => {
				if (doc.exists()) {
					const data = doc.data() as UserDataProps;
					dispatch(setUserFirestoreData(data));
				}
			});

			// Return a cleanup function to unsubscribe when the component unmounts
			return () => unsubscribe();
		};

		fetchData();
	}, [userState.uid]);

	return (
		<div className="flex relative h-screen flex-col w-full ">
			<header className="sticky top-0">
				<Navbar />
			</header>
			<main className="main flex flex-1 ">
				{userState.uid && (
					<div className="flex">
						<Sidebar />
					</div>
				)}

				<div className="flex flex-1 ">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Root;
