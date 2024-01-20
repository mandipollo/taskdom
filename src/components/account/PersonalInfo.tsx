import React from "react";
import avatar from "../../assets/avatar.jpg";

const PersonalInfo: React.FC = () => {
	return (
		<div className="flex h-full w-4/5 pt-2 pl-2 md:flex-row md:space-x-10 flex-col z-10 absolute top-0 left-0 bg-white">
			<div className="h-36 w-36 overflow-hidden flex justify-center items-center rounded-full relative 0">
				<img
					src={avatar}
					height="100%"
					width="100%"
					alt="Profile picture"
					className="rounded-full "
				></img>
				<button className="absolute h-10 bottom-0 left-0 right-0  bg-gray-300">
					EDIT
				</button>
			</div>
			<div className="flex flex-col flex-1 ">
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Name</p>
					<input
						type="text"
						className="focus:outline-0"
						placeholder="mandip gurung"
					/>
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Email</p>

					<input
						type="email"
						className="focus:outline-0"
						placeholder="mandip@gmail.com"
					/>
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Password</p>
					<input
						type="password"
						className="focus:outline-0"
						placeholder="**********"
					/>
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<div className="flex justify-between text-gray-400">
						<p>Designation</p>
					</div>

					<input
						type="text"
						className="focus:outline-0"
						placeholder="Front-end developer"
					/>
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Work hours</p>
					<input placeholder="0900-1800" type="number" />
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Contact no.</p>
					<input placeholder="07492914516" type="number" />
				</div>
				<div className="flex flex-1 justify-center items-center">
					<button className="bg-[#508D69] rounded-md px-10 text-2xl text-white">
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
