import React, { useState } from "react";
import ChatInput from "./ChatInput";
import TargetChatUser from "./TargetChatUser";

import ChatMessage from "./ChatMessage";
import { useAppDispatch, useAppSelector } from "../../../store/store";

import { resetUserChat } from "../../../store/chatSlice";
import { CrossSvg } from "../../../assets/action/ActionSvgs";
interface ChatConnectionsProps {}
const ChatConnections: React.FC<ChatConnectionsProps> = ({}) => {
	// chat ui

	const [displayChat, setDisplayChat] = useState<Boolean>(false);

	const dispatch = useAppDispatch();
	const chatState = useAppSelector(state => state.chat);

	const handleResetUser = () => {
		setDisplayChat(!displayChat);
		dispatch(resetUserChat());
	};

	return (
		<section
			className={`${
				chatState.displayChat ? "flex" : "hidden"
			} relative flex-col w-full h-full dark:border-darkBorder border-l`}
		>
			<div className="w-full items-center h-20 flex flex-row">
				{chatState.user && <TargetChatUser member={chatState.user} />}
				<button
					className="mr-2 w-10  h-10 flex justify-center items-center "
					onClick={handleResetUser}
				>
					<figure>
						<CrossSvg
							width={20}
							height={20}
							className="text-black dark:text-white"
						/>
					</figure>
				</button>
			</div>
			<ChatMessage />
			<ChatInput />
		</section>
	);
};

export default ChatConnections;
