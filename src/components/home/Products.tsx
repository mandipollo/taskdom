import React from "react";
import calender from "../../assets/timeTracker.avif";

import Lottie from "lottie-react";
import animation from "../../assets/Animation - 1705901263123.json";

const Products: React.FC = () => {
	return (
		<div className="flex flex-col px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
			<div className="grid items-center grid-cols-1 lg:grid-cols-2">
				<div className="flex  flex-row  flex-wrap ">
					<h1 className="text-2xl font-bold text-[#E6EDF3] sm:text-2xl lg:text-5xl">
						In built calender
					</h1>
					<p className="text-md text-gray-400">
						Tired of endless email threads and missed appointments? Say goodbye
						to scheduling headaches, the ultimate solution for effortless
						collaboration and streamlined calendar planning.
					</p>
				</div>
				<div className="flex  justify-center items-center">
					<img src={calender} alt="calender"></img>
				</div>
			</div>
			<div className="grid items-center grid-cols-1  lg:grid-cols-2">
				<div className=" flex  flex-row justify-center items-center flex-wrap ">
					<h1 className="text-2xl font-bold text-[#E6EDF3] sm:text-2xl lg:text-5xl">
						Communication and file sharing platform
					</h1>
					<p className="text-md text-gray-400">
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

export default Products;
