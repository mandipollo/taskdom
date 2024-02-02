// authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	uid: string | null;
	displayName: string | null;
	photoURL: string | null;
	email: string | null;
}

const initialState: AuthState = {
	uid: null,
	displayName: null,
	photoURL: null,
	email: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthState | null>) => {
			return { ...state, ...action.payload };
		},
		resetUser: () => {
			return { ...initialState };
		},
	},
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
