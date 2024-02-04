import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userDataProps } from "../components/utilities/userDataProps";

const initialUserData: userDataProps = {
	contactNo: null,
	displayName: "",
	email: "",
	jobTitle: null,
	profileImage: undefined,
	uid: "",
	workHours: null,
};
const userFirestoreData = createSlice({
	name: "userData",
	initialState: initialUserData,
	reducers: {
		setUserFirestoreData: (state, action: PayloadAction<userDataProps>) => {
			return { ...state, ...action.payload };
		},
		resetUserFirestoreData: () => {
			return { ...initialUserData };
		},
	},
});

export const { setUserFirestoreData, resetUserFirestoreData } =
	userFirestoreData.actions;

export default userFirestoreData.reducer;
