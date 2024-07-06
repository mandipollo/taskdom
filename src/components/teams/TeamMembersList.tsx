import { DocumentData } from "firebase/firestore";
import React from "react";

import Members from "./Members";

type teamMemberProps = {
	teamMembers: DocumentData[];
};

const TeamMembersList: React.FC<teamMemberProps> = ({ teamMembers }) => {
	return (
		<nav>
			<ul className="flex p-2 flex-col space-y-2">
				{teamMembers
					? teamMembers.map(member => (
							<Members key={member.uid} member={member} />
					  ))
					: null}
			</ul>
		</nav>
	);
};

export default TeamMembersList;
