import React from "react";
import { useEffect, useState } from "react";
import { getDoc, doc, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUserChat } from "../../store/chatSlice";
import Chat from "./Chat";
import { selectProps } from "../teams/Teams";
import ChatList from "./ChatList";

const ChatMain: React.FC = () => {
	const dispatch = useAppDispatch();
	const uid = useAppSelector(state => state.auth.uid);
	const chatUser = useAppSelector(state => state.chat);

	const [chatList, setChatList] = useState<DocumentData[]>([]);

	// dispatch the selected user for chat state
	const handleSelect = ({
		chatId,
		userUid,
		displayName,
		profileImage,
	}: selectProps) => {
		dispatch(
			setUserChat({
				chatId,
				user: {
					uid: userUid,
					displayName: displayName,
					profileImage: profileImage,
				},
			})
		);
	};

	// retrieve active chat members from firestore
	useEffect(() => {
		const unsub = async () => {
			const res = await getDoc(doc(db, `usersChat/${uid}`));
			if (res.exists()) {
				const chat = Object.entries(res.data());

				setChatList(chat);
			}
		};

		return () => {
			unsub();
		};
	}, [uid]);

	return (
		<div className="flex flex-col h-full w-full space-y-4 ">
			<ChatList chatList={chatList} handleSelect={handleSelect} />
			<Chat chatUser={chatUser} />
		</div>
	);
};

export default ChatMain;
