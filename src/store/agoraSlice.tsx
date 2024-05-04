// agoraSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";

interface AgoraState {
	localCameraTrack: ICameraVideoTrack | null;
	localMicrophoneTrack: IMicrophoneAudioTrack | null;
	isJoined: boolean;
}

const initialState: AgoraState = {
	localCameraTrack: null,
	localMicrophoneTrack: null,
	isJoined: false,
	// Initialize other Agora-related state properties
};

const agoraSlice = createSlice({
	name: "agora",
	initialState,
	reducers: {
		setLocalCameraTrack: (
			state,
			action: PayloadAction<ICameraVideoTrack | null>
		) => {
			state.localCameraTrack = action.payload;
		},
		setLocalMicrophoneTrack: (
			state,
			action: PayloadAction<IMicrophoneAudioTrack | null>
		) => {
			state.localMicrophoneTrack = action.payload;
		},
		setIsJoined: state => {
			state.isJoined = !state.isJoined;
		},
		// Add other reducer functions to update Agora-related state
	},
});

export const { setLocalCameraTrack, setLocalMicrophoneTrack, setIsJoined } =
	agoraSlice.actions;

// export const selectLocalCameraTrack = (state: RootState) =>
// 	state.agora.localCameraTrack;
// export const selectLocalMicrophoneTrack = (state: RootState) =>
// 	state.agora.localMicrophoneTrack;
// Add other selector functions as needed

export default agoraSlice.reducer;
