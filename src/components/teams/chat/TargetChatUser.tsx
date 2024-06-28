import React from "react";
import { DocumentData } from "firebase/firestore";

type targetChatUserProps = {
	member: DocumentData;
};

const TargetChatUser: React.FC<targetChatUserProps> = ({ member }) => {
	return (
		<div className="flex w-full h-20 items-center justify-center ">
			<div className="flex px-2  items-center   rounded-xl">
				<div className="flex space-x-2 p-2 justify-center items-center">
					<p className="uppercase"> {member.displayName}</p>
				</div>
			</div>
		</div>
	);
};

export default TargetChatUser;
