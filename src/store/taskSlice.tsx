import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskProps } from "../components/utilities/userDataProps";

interface TaskState {
	tasks: TaskProps[];
}

const initialState: TaskState = {
	tasks: [],
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		setTask: (state, action: PayloadAction<TaskState>) => {
			return { ...state, ...action.payload };
		},
		resetTask: () => {
			return { ...initialState };
		},
	},
});

export const { setTask, resetTask } = taskSlice.actions;
export default taskSlice.reducer;
