import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface snackState {
	show: boolean;
	message: string | null;
}

const initialSnackState: snackState = {
	show: false,
	message: null,
};
const snackBarSlice = createSlice({
	name: "snackbar",
	initialState: initialSnackState,
	reducers: {
		setSnackBar: (state, action: PayloadAction<snackState>) => {
			state.show = action.payload.show;
			state.message = action.payload.message;
		},
		hideSnackbar: state => {
			state.show = false;
			state.message = null;
		},
	},
});

export const { setSnackBar, hideSnackbar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
