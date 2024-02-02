// authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chatState {
	chatId: string | null;
	user: {
		uid: string | null;
		displayName: string | null;
		profileImage: string | null;
	};
}

const initialState: chatState = {
	chatId: null,
	user: {
		uid: null,
		displayName: null,
		profileImage: null,
	},
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setUserChat: (state, action: PayloadAction<chatState | null>) => {
			if (action.payload) {
				(state.chatId = action.payload.chatId),
					(state.user = action.payload.user);
			}
		},
		resetUserChat: () => {
			return { ...initialState };
		},
	},
});

export const { setUserChat, resetUserChat } = chatSlice.actions;
export default chatSlice.reducer;
