import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type emailState = {
	email: string | null;
};
const initialState: emailState = {
	email: null,
};
const emailSlice = createSlice({
	name: "email",
	initialState,
	reducers: {
		setEmailState: (state, action: PayloadAction<string | null>) => {
			state.email = action.payload;
		},
		resetEmailState: state => {
			state.email = null;
		},
	},
});

export const { setEmailState, resetEmailState } = emailSlice.actions;

export default emailSlice.reducer;
