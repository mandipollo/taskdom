import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataProps } from "../components/utilities/userDataProps";

const initialUserData: UserDataProps = {
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
