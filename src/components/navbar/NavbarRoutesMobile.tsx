type navProps = {
	userUid: string | null | undefined;
	handleToggle: () => void;
};

const NavbarRoutesMobile = ({ handleToggle }: navProps) => {
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
