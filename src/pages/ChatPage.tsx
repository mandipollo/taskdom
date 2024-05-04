import React from "react";
import { useEffect, useState } from "react";
import {
	getDoc,
	doc,
	DocumentData,
	onSnapshot,
	collection,
	query,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUserChat } from "../store/chatSlice";
import ChatMessage from "../components/chats/ChatMessage";
import { SelectProps } from "../components/utilities/userDataProps";
import ChatMemberList from "../components/chats/ChatMemberList";
import { Unsubscribe } from "firebase/auth";

const ChatPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const uid = useAppSelector(state => state.auth.uid);
	const chatUser = useAppSelector(state => state.chat);

	const chatId = chatUser.chatId;

	const [chatMemberList, setChatMemberList] = useState<DocumentData[string]>(
		[]
	);

	const [message, setMessage] = useState<DocumentData[] | null>(null);

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
				setChatMemberList(chat);
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
			const docRef = collection(doc(db, `chats/${chatId}`), "message");
			const q = query(docRef);
			unsubscribe = onSnapshot(q, snapshot => {
				const messages: DocumentData[] = [];
				snapshot.forEach(data => {
					const message = data.data();
					messages.push(message);
				});
				messages.sort((a, b) => {
					return a.date - b.date;
				});
				setMessage(messages);
			});
		}
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [chatId]);

	return (
		<div
			className="flex flex-row w-full "
			style={{ height: " calc( 100vh - 3.5rem )" }}
		>
			<ChatMemberList
				chatMemberList={chatMemberList}
				handleSelect={handleSelect}
			/>
			{chatId && <ChatMessage chatUser={chatUser} message={message} />}
		</div>
	);
};

export default ChatPage;
