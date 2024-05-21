import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataProps } from "../components/utilities/userDataProps";

const initialUserData: UserDataProps = {
	contactNo: "",
	displayName: "",
	email: "",
	jobTitle: "",
	profileImage: "",
	uid: "",
	workHours: "",
};
const userFirestoreData = createSlice({
	name: "userData",
	initialState: initialUserData,
	reducers: {
		setUserFirestoreData: (state, action: PayloadAction<UserDataProps>) => {
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
