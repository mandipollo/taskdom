import React, { useEffect, useRef } from "react";
import { DocumentData } from "firebase/firestore";
import ChatInput from "./ChatInput";
import { useAppSelector } from "../../store/store";
import TargetChatUser from "./TargetChatUser";
import Agora from "./agora";
// import VideoCall from "./VideoCall";

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
	// call state

	const isJoined = useAppSelector(state => state.agora.isJoined);
	const chatId = chatUser.chatId;
	const user = useAppSelector(state => state.auth);

	const { displayName, profileImage, uid } = chatUser.user;

	// if image not available

	const defaultImage = displayName?.charAt(0).toUpperCase();
	// Use useRef to create a reference to the scrollable container
	const messageRef = useRef<HTMLDivElement>(null);

	// dynamic class for chat message owner

	// Use useEffect to scroll to the bottom when new messages are added
	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [message]);

	return (
		<div className="flex w-full flex-1 flex-col border border-[#30363E] overflow-hidden ">
			<TargetChatUser
				isJoined={isJoined}
				displayName={displayName}
				profileImage={profileImage}
				defaultImage={defaultImage}
			/>
			<Agora />
			<div className="flex relative flex-col flex-1 p-2 bg-[rgb(0,4,8)] overflow-hidden">
				<div
					className="flex  overflow-auto mb-4 "
					style={{ maxHeight: "calc( 100% - 5rem)" }}
				>
					<ul className="flex flex-1 w-full h-full flex-col space-y-4 ">
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
										// current user
										<>
											<div className="flex pl-2 justify-end">
												{mes.image && (
													<img
														width="30%"
														height="30%"
														src={mes.image ?? ""}
														alt="image uploaded on chat"
													/>
												)}
											</div>
											<div className="flex space-x-2 ">
												<p className="bg-blue-400 p-2 rounded-2xl text-md">
													{mes.text}
												</p>
											</div>
										</>
									) : (
										<>
											<div className="flex space-x-2 ">
												<p className="bg-gray-400 p-2 rounded-2xl ">
													{mes.text}
												</p>
											</div>
											<div className="flex pl-2 justify-start">
												{mes.image && (
													<img
														width="30%"
														height="30%"
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
