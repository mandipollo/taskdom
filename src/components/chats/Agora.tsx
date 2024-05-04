import { useState } from "react";
import { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-react";
import AgoraManager from "../agora-manager/AgoraManager";
import config from "../agora-manager/config";
import { useAppSelector } from "../../store/store";

export function GetStarted() {
	const agoraEngine = useRTCClient(
		AgoraRTC.createClient({ codec: "vp8", mode: config.selectedProduct })
	);

	const isJoined = useAppSelector(state => state.agora.isJoined);
	console.log(isJoined);

	// const renderActionButton = () => {
	// 	return isJoined ? (
	// 		<button onClick={handleLeaveClick}>Leave</button>
	// 	) : (
	// 		<button onClick={handleJoinClick}>Join</button>
	// 	);
	// };

	return (
		<div>
			{/* {renderActionButton()} */}
			{isJoined && (
				<AgoraRTCProvider client={agoraEngine}>
					<AgoraManager config={config} children={undefined}></AgoraManager>
				</AgoraRTCProvider>
			)}
		</div>
	);
}

export default GetStarted;
