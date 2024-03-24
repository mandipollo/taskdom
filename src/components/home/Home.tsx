import React from "react";
import heroImg from "../../assets/hero-img.png";
import home1 from "../../assets/HOME24-web-hero-3x-en-US.webp";
import mckessonLogo from "../../assets/mckesson.svg";
import amazonlogo from "../../assets/amazon-logo.svg";
import jjLogo from "../../assets/j&j-logo.svg";
import dellLogo from "../../assets/dell-logo.svg";
import merckLogo from "../../assets/merck-logo.webp";
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import animation from "../../assets/Animation - 1705901263123.json";

const Home: React.FC = () => {
	return (
		<div className="flex flex-1 flex-col text-black ">
			<div className="flex flex-col bg-white px-4 justify-center text-center h-full gap-4">
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
				<div className="flex flex-col justify-center items-center h-60 gap-4">
					<p className="text-2xl">85% of some companies choose Taskdom</p>
					<div className="flex items-center justify-center gap-6">
						<img className="w-40" src={mckessonLogo} alt="" />
						<img className="w-40" src={amazonlogo} alt="" />
						<img className="w-40" src={merckLogo} alt="" />
						<img className="w-40" src={jjLogo} alt="" />
						<img className="w-40" src={dellLogo} alt="" />
					</div>
				</div>
			</div>
			<div className="px-4 mx-auto max-w-8xl sm:px-6  lg:px-8 bg-[#FFF5ED]">
				<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
					<div>
						<h1 className=" font-bold text-4xl">
							Collaborate remotely, with <br></br>
							<div className="relative inline-flex">
								<span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
								<h1 className="relative text-4xl">Taskdom.</h1>
							</div>
						</h1>

						<p className="mt-8 text-base sm:text-xl">
							Connect, Chat, and Schedule with Ease.
						</p>
					</div>

					<div>
						<img className="w-full" src={heroImg} alt="" />
					</div>
				</div>
			</div>

			<div className="grid items-center grid-cols-1  lg:grid-cols-2 bg-white px-4">
				<div className=" flex  flex-row justify-center items-center flex-wrap ">
					<h1 className="text-2xl font-bold  sm:text-2xl lg:text-5xl">
						Communication and file sharing platform
					</h1>
					<p className="text-md ">
						Elevate your team's communication with Chat. Enjoy an intuitive
						interface for effortless messaging, whether engaging in private
						discussions, creating dedicated group chats for projects, or
						seamlessly sharing files. Stay connected with real-time updates,
						customizable notifications, and a user-friendly platform designed
						for efficient collaboration. Start your free trial today and
						revolutionize the way your team communicates.
					</p>
				</div>
				<div className=" flex justify-center items-center">
					<Lottie
						animationData={animation}
						autoplay={true}
						loop={true}
					></Lottie>
				</div>
			</div>
		</div>
	);
};

export default Home;
