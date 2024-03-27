import { Link } from "react-router-dom";
import signOutUser from "../../firebaseAuth/signOutUser";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { resetUserFirestoreData } from "../../store/userFirestoreData";

type navProps = {
	userUid: string | null | undefined;
	handleToggle: () => void;
};

const NavbarRoutesMobile = ({ userUid, handleToggle }: navProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const signOutHandler = () => {
		dispatch(resetUserFirestoreData());
		signOutUser();

		navigate("/");
	};
	return (
		<ul
			onClick={handleToggle}
			className="space-y-4 text-lg font-thin text-[#E6EDF3]"
		>
			<li>
				<p className="text-sm">Just wanted to put the hamburger menu...</p>
			</li>
		</ul>
	);
};

export default NavbarRoutesMobile;
