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
const ChatMessage: React.FC<chatUserProps> = ({ chatUser, message }) => {
	const chatId = chatUser.chatId;
	const user = useAppSelector(state => state.auth);

	const { displayName, profileImage, uid } = chatUser.user;

	// Use useRef to create a reference to the scrollable container
	const messageRef = useRef<HTMLDivElement>(null);

	// dynamic class for chat message owner

	// Use useEffect to scroll to the bottom when new messages are added
	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [message]);

	return (
		<div className="flex h-full w-full flex-col border border-[#30363E]  ">
			<TargetChatUser displayName={displayName} profileImage={profileImage} />

			<div className="flex flex-col flex-1 p-2 bg-[#000408]">
				<div className="flex relative h-80 overflow-auto ">
					<ul className="flex w-full h-full flex-col space-y-4 ">
						{message &&
							message.map((mes: DocumentData) => (
								<li
									className={
										mes.senderId === user.uid
											? "flex space-y-2  items-end flex-col w-full space-x-4"
											: "flex space-y-2   justify-start  flex-col w-full space-x-4"
									}
									key={mes.id}
								>
									{mes.senderId === user.uid ? (
										<>
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
											<div className="flex space-x-2 ">
												<p>{mes.text}</p>
												<img
													width={20}
													height={20}
													src={
														mes.senderId === user.uid
															? user.photoURL
															: profileImage
													}
													alt="chat user image"
												/>
											</div>
										</>
									) : (
										<>
											<div className="flex space-x-2 ">
												<img
													width={20}
													height={20}
													src={
														mes.senderId === user.uid
															? user.photoURL
															: profileImage
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
										</>
									)}
								</li>
							))}
						<div ref={messageRef}></div>
					</ul>
				</div>
				<ChatInput chatId={chatId} chatUserUid={uid} />
			</div>
		</div>
	);
};

export default ChatMessage;
