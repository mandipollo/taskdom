import React from "react";
import avatar from "../../assets/manAvatar.svg";

type upcomingProps = {
	profileImage: string | undefined;
};
const UpcomingMeetingDisplay: React.FC<upcomingProps> = ({ profileImage }) => {
	const image = profileImage || avatar;
	return (
		<section className="flex flex-col w-2/3 pt-10 space-y-2   ">
			<div className="flex justify-center rounded-xl p-2 w-8/10 bg-[#508D69] ">
				UPCOMING MEETING
			</div>
			<div className="flex justify-center items-center  h-1/2 rounded-xl border dark:border-[#30363E] dark:bg-[#0D1117] bg-[#F2F2F2] shadow-md ">
				<figure className="flex justify-center w-1/4">
					<img
						className="rounded-full w-10 h-10 object-cover border-gray-400 border"
						src={image}
						alt="meeting pic"
					/>
				</figure>
				<div className="flex flex-col justify-center  w-3/4">
					<div className="flex flex-col">
						<p className="text-md">Dean Ferrera</p>
						<p className="text-sm">Discuss about the price of the goods.</p>
					</div>
					<div className="flex justify-around">
						<p className="dark:bg-[#0D1117] border-[#30363E] border dark:text-[#E6EDF3] px-4 rounded-xl">
							3:00
						</p>
						<p className="dark:bg-[#0D1117] border-[#30363E] border dark:text-[#E6EDF3]  px-4 rounded-xl">
							3:30
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UpcomingMeetingDisplay;
