const DashboardSvg = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		fill="currentColor"
		width={props.width}
		height={props.height}
		className="current-fit"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		id="dashboard"
	>
		<rect x="2" y="2" width="9" height="11" rx="2"></rect>
		<rect x="13" y="2" width="9" height="7" rx="2"></rect>
		<rect x="2" y="15" width="9" height="7" rx="2"></rect>
		<rect x="13" y="11" width="9" height="11" rx="2"></rect>
	</svg>
);

export default DashboardSvg;
