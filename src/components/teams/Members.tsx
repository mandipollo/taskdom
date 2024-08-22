import React from "react";

import { DocumentData } from "firebase/firestore";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUserChat, setDisplayChat } from "../../store/chatSlice";
interface MemberProps {
	member: DocumentData;
}
const Members: React.FC<MemberProps> = ({ member }) => {
	const uid = useAppSelector(state => state.userFirestoreData.uid);
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
			className={` flex-row border border-darkBorder space-x-1  items-center flex overflow-x-hidden rounded-md h-16 p-0.5 text-gray-400 hover:border-gray-400 hover:cursor-pointer`}
			onClick={() => handleSelect({ ...member, chatId })}
			key={member.uid}
		>
			{member.profileImage ? (
				<figure>
					<img
						className="rounded-full w-10 h-10 object-cover"
						src={member.profileImage}
						alt="member profile picture"
					/>
				</figure>
			) : (
				<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
					<p>{member.displayName?.charAt(0).toUpperCase()}</p>
				</span>
			)}

			<article className="sm:flex flex-col hidden  truncate">
				<p className="text-primaryGreen uppercase">{member.displayName}</p>
				{member.lastMessage && (
					<p className="text-sm ">{member.lastMessage.text}</p>
				)}
			</article>
		</li>
	);
};

export default Members;
