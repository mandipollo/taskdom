import { DocumentData } from "firebase/firestore";
import React from "react";
import { SelectProps } from "../utilities/userDataProps";
type chatMemberListProps = {
	chatMemberList: DocumentData[string];
	handleSelect: (selectMember: SelectProps) => void;
};

const ChatMemberList: React.FC<chatMemberListProps> = ({
	chatMemberList,
	handleSelect,
}) => {
	return (
		<ul className="flex">
			{chatMemberList &&
				chatMemberList.map((chat: DocumentData[string]) => (
					<li
						onClick={() =>
							handleSelect({
								chatId: chat[0],
								userUid: chat[1].userInfo.uid,
								displayName: chat[1].userInfo.displayName,
								profileImage: chat[1].userInfo.profileImage,
							})
						}
						key={chat[0]}
						className="flex flex-row mt-4 bg-[#161B22] rounded-md h-16 mx-2 p-2 space-x-4  text-gray-400 hover:text-[#E6EDF3] hover:cursor-pointer"
					>
						<div className="flex rounded-full">
							{chat[1].userInfo.profileImage ? (
								<img
									width="100%"
									height="100%"
									src={chat[1].userInfo.profileImage}
									alt="user profile pic"
								/>
							) : (
								<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
									<p>{chat[1].userInfo.displayName?.charAt(0).toUpperCase()}</p>
								</span>
							)}
						</div>

						<div className="flex flex-col">
							<div className="flex uppercase text-md">
								{chat[1].userInfo.displayName}
							</div>
							<div className="flex">{chat[1].userInfo.jobTitle}</div>
						</div>
					</li>
				))}
		</ul>
	);
};

export default ChatMemberList;
