import React from "react";
import { Link } from "react-router-dom";

const NavbarRoutesMobile: React.FC = () => {
	return (
		<ul className="space-y-4 text-lg font-thin">
			<li>
				<Link to="/">
					<button>HOME</button>
				</Link>
			</li>
			<li>
				<Link to="/products">
					<button>PRODUCTS</button>
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
			<li>
				<Link to="/login">
					<button>LOGIN</button>
				</Link>
			</li>
		</ul>
	);
};

export default NavbarRoutesMobile;
