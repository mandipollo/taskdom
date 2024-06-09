import { DocumentData } from "firebase/firestore";
import React from "react";

import Members from "./Members";
import ConnectionRequest from "./chat/ConnectionRequest";

type teamMemberProps = {
	teamMembers: DocumentData[];
};

const TeamMembersList: React.FC<teamMemberProps> = ({ teamMembers }) => {
	return (
		<ul className="flex ml-1 flex-col space-y-2">
			<ConnectionRequest />
			{teamMembers
				? teamMembers.map(member => (
						<Members key={member.uid} member={member} />
				  ))
				: null}
		</ul>
	);
};

export default TeamMembersList;
