import React from "react";
import { useEffect, useState } from "react";
import { getDoc, doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUserChat } from "../../store/chatSlice";
import Chat from "./Chat";
import { selectProps } from "../utilities/userDataProps";
import ChatList from "./ChatList";
import { Unsubscribe } from "firebase/auth";

const ChatMain: React.FC = () => {
	const dispatch = useAppDispatch();
	const uid = useAppSelector(state => state.auth.uid);
	const chatUser = useAppSelector(state => state.chat);
	const chatId = chatUser.chatId;

	const [chatList, setChatList] = useState<DocumentData[string]>([]);

	const [message, setMessage] = useState<DocumentData[string] | null>(null);

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

	// retrieve message from firestore

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined;

		if (chatId) {
			const docRef = doc(db, `chats/${chatId}`);
			unsubscribe = onSnapshot(docRef, doc => {
				if (doc.exists()) {
					setMessage(doc.data().message);
				}
			});
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [chatId]);

	return (
		<div className="flex flex-col h-full w-full space-y-4 ">
			<ChatList chatList={chatList} handleSelect={handleSelect} />
			<Chat chatUser={chatUser} message={message} />
		</div>
	);
};

export default ChatMain;
