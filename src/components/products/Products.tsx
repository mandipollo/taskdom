import React from "react";
import calender from "../../assets/calender.jpg";
import officemeeting from "../../assets/officeMeeting.jpg";

const Products: React.FC = () => {
	return (
		<div className="flex flex-col h-full   bg-white">
			<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
				<div className="flex  flex-row justify-center items-center flex-wrap p-20">
					<p className=" md:text-2xl sm:text-sm lg:text:4xl">
						In built calender
					</p>
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
			<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
				<div className=" flex justify-center items-center">
					<img src={officemeeting} alt="meeting"></img>
				</div>
				<div className=" flex  flex-row justify-center items-center flex-wrap p-20">
					<p className=" md:text-2xl sm:text-sm lg:text:4xl">
						Communication and file sharing platform
					</p>
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
			</div>
		</div>
	);
};

export default Products;
