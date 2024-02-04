import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";
import { resetUser, setUser } from "../store/authSlice";
import { auth } from "../../firebase.config";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetUserChat } from "../store/chatSlice";
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
	return (
		<div className="flex relative min-h-screen flex-col  w-full max-w-screen-2xl ">
			<header>
				<Navbar />
			</header>
			<main className="main flex flex-1">
				{userState.uid && (
					<div className="flex w-1/6">
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
