import React, { useEffect, useRef } from "react";
import { DocumentData } from "firebase/firestore";
import ChatInput from "./ChatInput";
import { useAppSelector } from "../../store/store";
import TargetChatUser from "./TargetChatUser";

type chatUserProps = {
	chatUser: {
		chatId: string | null;
		user: {
			displayName: string | null;
			profileImage: string | undefined;
			uid: string | null;
		};
	};
	message: DocumentData[string] | null;
};
const Chat: React.FC<chatUserProps> = ({ chatUser, message }) => {
	const chatId = chatUser.chatId;
	const user = useAppSelector(state => state.auth);

	const { displayName, profileImage, uid } = chatUser.user;

	// Use useRef to create a reference to the scrollable container
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	// Use useEffect to scroll to the bottom when new messages are added
	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [message]);

	return (
		<div className="flex h-full w-full flex-col border border-[#30363E]  ">
			<TargetChatUser displayName={displayName} profileImage={profileImage} />

			<div className="flex flex-col flex-1 p-2 bg-[#000408]">
				<div ref={messagesContainerRef} className="flex flex-1">
					<ul className="flex w-full flex-col space-y-4 overflow-auto">
						{message &&
							message.map((mes: DocumentData) => (
								<li
									className="flex space-y-2  justify-start flex-col w-full space-x-4"
									key={mes.id}
								>
									<div className="flex space-x-2 ">
										<img
											width={20}
											height={20}
											src={
												mes.senderId === user.uid ? user.photoURL : profileImage
											}
											alt="chat user image"
										/>
										<p>{mes.text}</p>
									</div>
									<div className="flex pl-2">
										{mes.image && (
											<img
												width={80}
												height={80}
												src={mes.image ?? ""}
												alt="image uploaded on chat"
											/>
										)}
									</div>
								</li>
							))}
					</ul>
				</div>
				<ChatInput chatId={chatId} chatUserUid={uid} />
			</div>
		</div>
	);
};

export default Chat;
