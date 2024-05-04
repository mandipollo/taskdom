import React from "react";
import dotMenu from "../../assets/dotMenu.svg";
import call from "../../assets/call.svg";
import hangup from "../../assets/hangup-phone-svgrepo-com.svg";
import { useAppDispatch } from "../../store/store";
import { setIsJoined } from "../../store/agoraSlice";
type targetChatUserProps = {
	profileImage: string | undefined;
	displayName: string | null;
	defaultImage: string | undefined;
	isJoined: boolean;
};

const TargetChatUser: React.FC<targetChatUserProps> = ({
	profileImage,
	displayName,
	defaultImage,
	isJoined,
}) => {
	const dispatch = useAppDispatch();

	console.log(isJoined);

	return (
		<div className="flex w-full h-20 items-center justify-center ">
			<div className="flex w-80 h-full p-4 ">
				<div className="flex space-x-4 justify-between  items-center bg-[#161B22] h-full w-full  rounded-xl">
					<div className="flex space-x-2 p-2 justify-center items-center">
						<p className="uppercase"> {displayName}</p>
					</div>
					<div className="flex p-2 space-x-2">
						<button>
							<img
								height={20}
								width={20}
								src={isJoined ? hangup : call}
								alt="call"
								onClick={() => dispatch(setIsJoined())}
							/>
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
