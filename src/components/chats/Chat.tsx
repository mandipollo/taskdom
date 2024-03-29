import React from "react";
import { useEffect, useState } from "react";
import { getDoc, doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUserChat } from "../../store/chatSlice";
import ChatMessage from "./ChatMessage";
import { SelectProps } from "../utilities/userDataProps";
import ChatList from "./ChatList";
import { Unsubscribe } from "firebase/auth";

const Chat: React.FC = () => {
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
	}: SelectProps) => {
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
				const chat = Object.entries(res.data()).sort(
					(a, b) => b[1].date - a[1].date
				);
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
		<div className="flex  flex-col w-full space-y-4 ">
			<ChatList chatList={chatList} handleSelect={handleSelect} />
			{chatId && <ChatMessage chatUser={chatUser} message={message} />}
		</div>
	);
};

export default Chat;
