import React from "react";
import avatar from "../../assets/manAvatar.svg";

type upcomingProps = {
	profileImage: string | null;
};
const UpcomingMeetingDisplay: React.FC<upcomingProps> = ({ profileImage }) => {
	const image = profileImage || avatar;
	return (
		<div className="flex flex-col w-2/3 pt-10 space-y-2 ">
			<div className="flex justify-center rounded-xl p-2 w-8/10 bg-[#508D69] ">
				UPCOMING MEETING
			</div>
			<div className="flex justify-center items-center  h-1/2 rounded-xl border border-[#30363E] bg-[#0D1117] ">
				<div className="flex justify-center w-1/4">
					<img
						className="rounded-full"
						src={image}
						alt="meeting pic"
						width={50}
						height={50}
					/>
				</div>
				<div className="flex flex-col justify-center  w-3/4">
					<div className="flex flex-col">
						<p className="text-md">Dean Ferrera</p>
						<p className="text-sm">Discuss about the price of the goods.</p>
					</div>
					<div className="flex justify-around">
						<p className="bg-[#0D1117] border-[#30363E] border text-[#E6EDF3] px-4 rounded-xl">
							3:00
						</p>
						<p className="bg-[#0D1117] border-[#30363E] border text-[#E6EDF3]  px-4 rounded-xl">
							3:30
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpcomingMeetingDisplay;
