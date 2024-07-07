import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ConnectionRequest from "../request/ConnectionRequest";
import signOutUser from "../../firebaseAuth/signOutUser";
import { resetUserFirestoreData } from "../../store/userFirestoreData";
import { useAppDispatch } from "../../store/store";
interface DropDownProps {
	handleDropDown: () => void;
}
const DropDown: React.FC<DropDownProps> = ({ handleDropDown }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const signOutHandler = () => {
		dispatch(resetUserFirestoreData());
		signOutUser();
		navigate("/");
		handleDropDown();
	};
	return (
		<ul className="absolute z-20 w-40 transition-colors duration-300 ease-in-out rounded-md text-black dark:text-white bg-gray-100 dark:bg-darkSecondary border border-darkBorder top-10 right-4  p-2 flex flex-col gap-2">
			<li onClick={() => handleDropDown()}>
				<ConnectionRequest />
			</li>
			<li onClick={() => handleDropDown()}>
				<Link to="/accountSetting">Settings</Link>
			</li>

			<li>
				<button onClick={signOutHandler}>
					<p>Sign out</p>
				</button>
			</li>
		</ul>
	);
};

export default DropDown;
