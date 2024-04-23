import home1 from "../assets/HOME24-web-hero-3x-en-US.webp";
import mckessonLogo from "../assets/mckesson.svg";
import amazonlogo from "../assets/amazon-logo.svg";
import jjLogo from "../assets/j&j-logo.svg";
import dellLogo from "../assets/dell-logo.svg";
import merckLogo from "../assets/merck-logo.webp";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="flex flex-1 flex-col text-black  ">
			<div className="flex flex-col bg-white  justify-center text-center h-full gap-4">
				<div className="flex flex-col items-center  gap-8">
					<h1 className="mt-36 sm:text-6xl text-4xl">
						A smarter way to work<br></br>
					</h1>

					<p className="  sm:text-xl font-thin ">
						With Taskdom, you can drive clarity and impact at scale by
						connecting work <br></br> and workflows to company-wide goals.
					</p>
					<Link
						to="/login"
						title=""
						className="w-40 rounded-sm items-center justify-center px-10 py-4 text-base font-semibold text-[#E6EDF3] hover:text-black transition-all duration-200 bg-black  hover:bg-orange-600 focus:bg-orange-600"
					>
						Get started
					</Link>
				</div>
				<div>
					<img className="w-full" src={home1} alt="" />
				</div>
				<div className="flex flex-col justify-center items-center h-60 gap-6">
					<p className="text-2xl">85% of some companies choose Taskdom</p>
					<div className="grid grid-cols-1 grid-rows-1 grid-flow-col gap-4">
						<img className="w-40" src={mckessonLogo} alt="" />
						<img className="w-40" src={amazonlogo} alt="" />
						<img className="w-40" src={merckLogo} alt="" />
						<img className="w-40" src={jjLogo} alt="" />
						<img className="w-40" src={dellLogo} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
