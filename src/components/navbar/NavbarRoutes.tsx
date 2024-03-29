import { Link } from "react-router-dom";

// type navProps = {
// 	email: string | null | undefined;
// };
const NavbarRoutes = () => {
	return (
		<ul className="flex w-full  justify-center items-center  font-mono text-md ">
			<li>
				<Link to="/">
					<button className="text-[#E6EDF3] hover:bg-white hover:text-black pl-4 pr-4 rounded-md ">
						HOME
					</button>
				</Link>
			</li>

			<li>
				<Link to="/about">
					<button className="text-[#E6EDF3] hover:bg-white hover:text-black pl-4 pr-4 rounded-md">
						ABOUT
					</button>
				</Link>
			</li>
			<li>
				<Link to="/contact">
					<button className="text-[#E6EDF3] hover:bg-white hover:text-black pl-4 pr-4 rounded-md">
						CONTACT
					</button>
				</Link>
			</li>
		</ul>
	);
};

export default NavbarRoutes;
