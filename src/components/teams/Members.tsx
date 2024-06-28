import React from "react";

import { DocumentData } from "firebase/firestore";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUserChat, setDisplayChat } from "../../store/chatSlice";
interface MemberProps {
	member: DocumentData;
}
const Members: React.FC<MemberProps> = ({ member }) => {
	const uid = useAppSelector(state => state.auth.uid);
	const dispatch = useAppDispatch();

	const chatId = uid && uid > member.uid ? uid + member.uid : member.uid + uid;
	// dispatch the selected user for chat state
	const handleSelect = ({
		chatId,
		uid,
		displayName,
		profileImage,
	}: DocumentData) => {
		dispatch(
			setUserChat({
				chatId: chatId,
				uid: uid,
				displayName: displayName,
				profileImage: profileImage,
			})
		);
		dispatch(setDisplayChat(true));
	};

	return (
		<li
			className={` flex-row border border-[#30363E] space-x-1  items-center flex w-40 overflow-x-hidden rounded-md h-16 p-0.5 text-gray-400 hover:border-gray-400 hover:cursor-pointer`}
			onClick={() => handleSelect({ ...member, chatId })}
			key={member.uid}
		>
			{member.profileImage ? (
				<img
					className="rounded-full w-10 h-10 object-cover"
					src={member.profileImage}
					alt="member member"
				/>
			) : (
				<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
					<p>{member.displayName?.charAt(0).toUpperCase()}</p>
				</span>
			)}

			<div className="flex flex-col truncate">
				<p className="text-[#508D69] uppercase">{member.displayName}</p>
				{member.lastMessage && (
					<p className="text-sm ">{member.lastMessage.text}</p>
				)}
			</div>
		</li>
	);
};

export default Members;
