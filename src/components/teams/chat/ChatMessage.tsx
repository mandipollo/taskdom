import { useEffect, useRef, useState } from "react";
import {
	DocumentData,
	Unsubscribe,
	collection,
	doc,
	onSnapshot,
	query,
} from "firebase/firestore";
import { useAppSelector } from "../../../store/store";

import { db } from "../../../../firebase.config";

const ChatMessage = () => {
	const chatState = useAppSelector(state => state.chat);
	const user = useAppSelector(state => state.userFirestoreData);

	// if image not available

	// const defaultImage = displayName?.charAt(0).toUpperCase();
	// Use useRef to create a reference to the scrollable container
	const messageRef = useRef<HTMLDivElement>(null);

	// rerieve chat message
	const [messages, setMessages] = useState<DocumentData[] | null>(null);

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined;
		if (chatState.user) {
			const docRef = collection(
				doc(db, `chats/${chatState.user.chatId}`),
				"message"
			);
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
				setMessages(messages);
			});
		}
		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [chatState.user]);

	// Use useEffect to scroll to the bottom when new messages are added
	useEffect(() => {
		if (messages) messageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div
			className="flex w-full flex-col h-full px-4"
			style={{ maxHeight: "calc( 100vh - 12rem )" }}
		>
			{messages && (
				<div className="flex flex-1 w-full h-full  ">
					<ul className="flex overflow-hidden flex-1 overflow-y-auto flex-col space-y-4 ">
						{messages.map((message: DocumentData) => {
							return (
								<li
									className={
										message.senderId === user.uid
											? "flex space-y-2  items-end flex-col w-full space-x-4"
											: "flex space-y-2   justify-start  flex-col w-full space-x-4"
									}
									key={message.id}
								>
									{message.senderId === user.uid ? (
										// current user
										<>
											<div className="flex pl-2 justify-end">
												{message.image && (
													<img
														width="30%"
														height="30%"
														src={message.image ?? ""}
														alt="image uploaded on chat"
													/>
												)}
											</div>
											{message.text && (
												<div className="flex space-x-2 ">
													<p className="bg-blue-400 p-2 rounded-2xl text-md">
														{message.text}
													</p>
												</div>
											)}
										</>
									) : (
										<>
											<div className="flex space-x-2 ">
												<p className="bg-gray-400 p-2 rounded-2xl ">
													{message.text}
												</p>
											</div>
											<div className="flex pl-2 justify-start">
												{message.image && (
													<img
														width="30%"
														height="30%"
														src={message.image ?? ""}
														alt="image uploaded on chat"
													/>
												)}
											</div>
										</>
									)}
								</li>
							);
						})}
						<div ref={messageRef}></div>
					</ul>
				</div>
			)}
		</div>
	);
};

export default ChatMessage;
