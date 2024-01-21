import { Link } from "react-router-dom";

type navProps = {
	email: string | null | undefined;
};
const NavbarRoutes = ({ email }: navProps) => {
	return (
		<ul className="flex w-full  justify-center items-center  font-mono text-md ">
			<li>
				<Link to="/">
					<button className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md ">
						HOME
					</button>
				</Link>
			</li>

			<li>
				<Link to="/about">
					<button className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md">
						ABOUT
					</button>
				</Link>
			</li>
			<li>
				<Link to="/contact">
					<button className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md">
						CONTACT
					</button>
				</Link>
			</li>

			{email && (
				<li>
					<Link to="/userDashboard">
						<button className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md">
							DASHBOARD
						</button>
					</Link>
				</li>
			)}
		</ul>
	);
};

export default NavbarRoutes;
