import { DocumentData } from "firebase/firestore";
import React from "react";

import { selectProps } from "../utilities/userDataProps";
type teamMemberProps = {
	teamMembers: DocumentData[];
	handleSelect: (selectMember: selectProps) => void;
};

const TeamMembersList: React.FC<teamMemberProps> = ({
	teamMembers,
	handleSelect,
}) => {
	return (
		<ul className="flex flex-1 space-x-2 p-2">
			{teamMembers &&
				teamMembers.map(team => (
					<li
						onClick={() =>
							handleSelect({
								chatId: team[0],
								userUid: team[1].userInfo.uid,
								displayName: team[1].userInfo.displayName,
								profileImage: team[1].userInfo.profileImage,
							})
						}
						className="flex flex-row text-gray-400 hover:text-[#E6EDF3] hover:cursor-pointer h-32 justify-center items-center space-x-4 border border-[#30363E] bg-[#161B22] w-60"
						key={team[1].userInfo.uid}
					>
						<img
							className="rounded-full"
							height={50}
							width={50}
							src={team[1].userInfo.profileImage}
							alt="team member"
						/>
						<div className="flex flex-col justify-center ">
							<p className="text-[#508D69] uppercase">
								{team[1].userInfo.displayName}
							</p>
							<p>{team[1].userInfo.jobTitle}</p>
							<p>{team[1].userInfo.workHours}</p>
						</div>
					</li>
				))}
		</ul>
	);
};

export default TeamMembersList;
