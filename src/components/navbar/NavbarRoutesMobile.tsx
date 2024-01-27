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
		<ul onClick={handleToggle} className="space-y-4 text-lg font-thin">
			<li>
				<Link to="/">
					<button>HOME</button>
				</Link>
			</li>

			<li>
				<Link to="/about">
					<button>ABOUT</button>
				</Link>
			</li>
			<li>
				<Link to="/contact">
					<button>CONTACT</button>
				</Link>
			</li>
			{userUid && (
				<li>
					<Link to="/userDashboard">
						<button>DASHBOARD</button>
					</Link>
				</li>
			)}

			{userUid ? (
				<li>
					<button onClick={signOutHandler}>SIGN OUT</button>
				</li>
			) : (
				<li>
					<Link to="/login">
						<button>LOGIN</button>
					</Link>
				</li>
			)}
		</ul>
	);
};

export default NavbarRoutesMobile;
