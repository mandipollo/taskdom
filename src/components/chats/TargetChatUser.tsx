import React from "react";
import dotMenu from "../../assets/dotMenu.svg";
import call from "../../assets/call.svg";

type targetChatUserProps = {
	profileImage: string | undefined;
	displayName: string | null;
};

const TargetChatUser: React.FC<targetChatUserProps> = ({
	profileImage,
	displayName,
}) => {
	return (
		<div className="flex w-full h-20 items-center justify-center ">
			<div className="flex w-80 h-full p-4 ">
				<div className="flex space-x-4 justify-between  items-center bg-[#161B22] h-full w-full  rounded-xl">
					<div className="flex space-x-2 p-2 justify-center items-center">
						<div className="flex ">
							<img
								width={25}
								height={25}
								src={profileImage}
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
	);
};

export default TargetChatUser;
