import { DocumentData } from "firebase/firestore";
import React from "react";
import { selectProps } from "../teams/Teams";
type chatListProps = {
	chatList: DocumentData[];
	handleSelect: (selectMember: selectProps) => void;
};

const ChatList: React.FC<chatListProps> = ({ chatList, handleSelect }) => {
	return (
		<ul className="flex">
			{chatList &&
				chatList.map(chat => (
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
							<img
								width="100%"
								height="100%"
								src={chat[1].userInfo.profileImage}
								alt="user profile pic"
							/>
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

export default ChatList;
