import { Link } from "react-router-dom";

const NavbarRoutes = () => {
	return (
		<ul className="flex w-full justify-center space-x-8 font-mono text-md ">
			<li>
				<Link to="/">
					<button>HOME</button>
				</Link>
			</li>
			<li>
				<Link to="products">
					<button>PRODUCTS</button>
				</Link>
			</li>

			<li>
				<Link to="about">
					<button>ABOUT</button>
				</Link>
			</li>
			<li>
				<Link to="contact">
					<button>CONTACT</button>
				</Link>
			</li>
		</ul>
	);
};

export default NavbarRoutes;
