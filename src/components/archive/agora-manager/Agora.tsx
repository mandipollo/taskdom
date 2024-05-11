import { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-react";
import AgoraManager from "./AgoraManager";
import config from "./config";

export function GetStarted() {
	const agoraEngine = useRTCClient(
		AgoraRTC.createClient({ codec: "vp8", mode: config.selectedProduct })
	);

	return (
		<div>
			<AgoraRTCProvider client={agoraEngine}>
				<AgoraManager config={config} children={undefined}></AgoraManager>
			</AgoraRTCProvider>
		</div>
	);
}

export default GetStarted;
