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
			return {
				show: action.payload.show,
				message: action.payload.message,
			};
		},
		hideSnackbar: state => {
			return { ...initialSnackState };
		},
	},
});

export const { setSnackBar, hideSnackbar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
