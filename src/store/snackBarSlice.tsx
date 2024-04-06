import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
	name: "snackbar",
	initialState: false,
	reducers: {
		setSnackBar: state => {
			return true;
		},
		hideSnackbar: state => {
			return false;
		},
	},
});

export const { setSnackBar, hideSnackbar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
