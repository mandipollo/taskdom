import React from "react";
import attach from "../../assets/attach.svg";
import sendIcon from "../../assets/sendIcon.svg";
import call from "../../assets/call.svg";
type chatUserProps = {
	chatUser: {
		chatId: string | null;
		user: {
			displayName: string | null;
			profileImage: string | null;
			uid: string | null;
		};
	};
};
const Chat: React.FC<chatUserProps> = ({ chatUser }) => {
	const { displayName, profileImage } = chatUser.user;
	return (
		<div className="flex h-full w-full flex-col border border-[#30363E] ">
			<div className="flex w-full h-20 p-4 ">
				<div className="flex justify-around  space-x-4  items-center bg-[#161B22] h-full w-full  rounded-xl">
					<div className="flex space-x-2 justify-center items-center">
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
					<div className="flex">
						<button className="">
							<img height={20} width={20} src={call} alt="call" />
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-col flex-1 bg-[#000408]">
				<div className="flex flex-1">chat message</div>
				<div className="flex h-32 w-full border-t border-[#30363E] space-x-4 justify-center items-center">
					<button className="h-10 ">
						<img src={attach} alt="image" width={30} height={30} />
					</button>
					<input
						className="rounded-md w-8/12 h-10 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] placeholder-[#E6EDF3] "
						type="text"
					/>
					<button className="h-10 rounded-md bg-[#508D69] flex flex-row w-32 justify-around items-center ">
						<p>Send</p>
						<img src={sendIcon} alt="send message" width={20} height={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
