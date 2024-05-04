// import React, { useEffect, useState } from "react";

// import AgoraRTC, {
// 	ICameraVideoTrack,
// 	IMicrophoneAudioTrack,
// } from "agora-rtc-sdk-ng";
// import { useAppSelector, useAppDispatch } from "../../store/store";
// import { endCall, startCall } from "../../store/callSlice";
// import { VideoPlayer } from "./VideoPlayer";

// import { UserCallProps } from "../utilities/userDataProps";

// const channelName = "test";
// const appId = "57ef537f90c24a8ab6e71cc13d4a4473";
// const tempToken =
// 	"007eJxTYFghcOrrH/F66Ym5ftwhC+c/r8t/yPTN16bA8lrDsey+biEFBlPz1DRTY/M0S4NkI5NEi8Qks1Rzw+RkQ+MUk0QTE3NjnmUmaQ2BjAwavqmsjAwQCOKzMJSkFpcwMAAAMdAeOg==";
// const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
// const VideoCall = () => {
// 	const [users, setUsers] = useState<UserCallProps[]>([]);
// 	const [localTracks, setLocalTracks] = useState<
// 		[IMicrophoneAudioTrack, ICameraVideoTrack] | null
// 	>(null);

// 	const dispatch = useAppDispatch();
// 	const callState = useAppSelector(state => state.call);

// 	const handleUserJoined = async (user: any, mediaType: any) => {
// 		await client.subscribe(user, mediaType);

// 		if (mediaType === "video") {
// 			setUsers(previousUsers => [...previousUsers, user]);
// 		}

// 		if (mediaType === "audio") {
// 			// user.audioTrack.play()
// 		}
// 	};

// 	const handleUserLeft = (user: { uid: string | number }) => {
// 		setUsers(prev => prev.filter(u => user.uid !== u.uid));
// 	};
// 	// useEffect(() => {
// 	// 	client.on("user-published", handleUserJoined);
// 	// 	client.on("user-left", handleUserLeft);

// 	// 	client
// 	// 		.join(appId, channelName, tempToken, null)
// 	// 		.then(uid =>
// 	// 			Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
// 	// 		)
// 	// 		.then(([tracks, uid]) => {
// 	// 			const [audioTrack, videoTrack] = tracks;
// 	// 			setLocalTracks(tracks);
// 	// 			setUsers(prevUsers => [...prevUsers, { uid, videoTrack, audioTrack }]);
// 	// 			client.publish(tracks);
// 	// 		});

// 	// 	return () => {
// 	// 		if (localTracks)
// 	// 			for (let localTrack of localTracks) {
// 	// 				localTrack.stop();
// 	// 				localTrack.close();
// 	// 			}
// 	// 		client.off("user-published", handleUserJoined);
// 	// 		client.off("user-left", handleUserLeft);
// 	// 		if (localTracks) client.unpublish(localTracks).then(() => client.leave());
// 	// 	};
// 	// }, []);
// 	console.log(users);

// 	return (
// 		<div className="flex flex-1">
// 			{users.map(user => (
// 				<VideoPlayer key={user.uid} user={user} />
// 			))}
// 		</div>
// 	);
// };

// export default VideoCall;
