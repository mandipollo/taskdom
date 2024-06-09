// authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	chatId: string | undefined;
	uid: string | null;
	displayName: string | null;
	profileImage: string | null;
}
interface chatState {
	displayChat: Boolean;
	user: User | null;
}

const initialState: chatState = {
	displayChat: false,
	user: {
		chatId: undefined,
		uid: null,
		displayName: null,
		profileImage: null,
	},
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		setUserChat: (state, action: PayloadAction<User>) => {
			if (action.payload !== undefined) {
				state.user = action.payload;
			}
		},
		resetUserChat: () => {
			return { ...initialState };
		},
		setDisplayChat: (state, action: PayloadAction<boolean>) => {
			state.displayChat = action.payload;
		},
		toggleDisplayChat: state => {
			state.displayChat = !state.displayChat;
		},
	},
});

export const { setUserChat, resetUserChat, setDisplayChat, toggleDisplayChat } =
	chatSlice.actions;
export default chatSlice.reducer;
