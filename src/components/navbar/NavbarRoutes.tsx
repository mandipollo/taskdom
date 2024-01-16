import { Link } from "react-router-dom";

const NavbarRoutes = () => {
	return (
		<ul className="flex w-full  justify-center items-center  font-mono text-md ">
			<li className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md ">
				<Link to="/">
					<button>HOME</button>
				</Link>
			</li>
			<li className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md">
				<Link to="/products">
					<button>PRODUCTS</button>
				</Link>
			</li>

			<li className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md">
				<Link to="/about">
					<button>ABOUT</button>
				</Link>
			</li>
			<li className=" hover:bg-black hover:text-white pl-4 pr-4 rounded-md">
				<Link to="/contact">
					<button>CONTACT</button>
				</Link>
			</li>
		</ul>
	);
};

export default NavbarRoutes;
