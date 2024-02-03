import React, { useEffect, useRef } from "react";
import call from "../../assets/call.svg";
import dotMenu from "../../assets/dotMenu.svg";
import { DocumentData } from "firebase/firestore";
import ChatInput from "./ChatInput";
import { useAppSelector } from "../../store/store";

type chatUserProps = {
	chatUser: {
		chatId: string | null;
		user: {
			displayName: string | null;
			profileImage: string | null;
			uid: string | null;
		};
	};
	message: DocumentData[string] | null;
	isLoading: boolean;
};
const Chat: React.FC<chatUserProps> = ({ chatUser, message, isLoading }) => {
	const chatId = chatUser.chatId;

	const currentUserImage = useAppSelector(state => state.auth.photoURL);
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

	console.log(message);

	return (
		<div className="flex h-full w-full flex-col border border-[#30363E]  ">
			<div className="flex w-full h-20 items-center justify-center ">
				<div className="flex w-80 h-full p-4 ">
					<div className="flex space-x-4 justify-between  items-center bg-[#161B22] h-full w-full  rounded-xl">
						<div className="flex space-x-2 p-2 justify-center items-center">
							<div className="flex ">
								<img
									width={25}
									height={25}
									src={profileImage || ""}
									alt="chat user pic"
								/>
							</div>
							<p className="uppercase"> {displayName}</p>
						</div>
						<div className="flex p-2 space-x-2">
							<button>
								<img height={20} width={20} src={call} alt="call" />
							</button>
							<button>
								<img height={20} width={20} src={dotMenu} alt="menu" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col flex-1 p-2 bg-[#000408]">
				<div ref={messagesContainerRef} className="flex flex-1">
					<ul className="flex w-full flex-col space-y-4 overflow-auto">
						{message &&
							message.map((mes: DocumentData) => (
								<li
									className="flex w-full items-center flex-row space-x-4"
									key={mes.id}
								>
									<img
										width={20}
										height={20}
										src={currentUserImage || ""}
										alt=""
									/>
									<p>{mes.text}</p>
									{mes.image && (
										<img width={80} height={80} src={mes.image || ""} alt="" />
									)}
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
