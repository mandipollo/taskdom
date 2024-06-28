import React, { useState } from "react";
import ChatInput from "./ChatInput";
import TargetChatUser from "./TargetChatUser";
import closeImg from "../../../assets/cross.svg";
import ChatMessage from "./ChatMessage";
import { useAppDispatch, useAppSelector } from "../../../store/store";

import { resetUserChat } from "../../../store/chatSlice";
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
		<div
			className={`${
				chatState.displayChat ? "flex" : "hidden"
			} relative flex-col w-full h-full border-[#30363E] border-l`}
		>
			<div className="w-full items-center h-20 flex   flex-row">
				{chatState.user && <TargetChatUser member={chatState.user} />}
				<button
					className="mr-2 w-10  h-10 flex justify-center items-center "
					onClick={handleResetUser}
				>
					<img src={closeImg} alt="close" width={20} height={20} />
				</button>
			</div>
			<ChatMessage />
			<ChatInput />
		</div>
	);
};

export default ChatConnections;
