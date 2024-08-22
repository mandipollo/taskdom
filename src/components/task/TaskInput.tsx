import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CrossSvg } from "../../assets/action/ActionSvgs";

type TaskInputProps = {
	handlePriority: (e: string) => void;
	targetDate: Date | null;
	setTargetDate: (date: Date | null) => void;
	handleToggleForm: () => void;
	handleTaskTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleTaskDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	taskDescription: string;
	taskTitle: string;
	handleTaskSubmit: (e: React.FormEvent) => void;
};
const TaskInput: React.FC<TaskInputProps> = ({
	targetDate,
	setTargetDate,
	handleToggleForm,
	handleTaskDescription,
	handleTaskTitle,
	taskDescription,
	taskTitle,
	handleTaskSubmit,
	handlePriority,
}) => {
	return (
		<form
			onSubmit={e => handleTaskSubmit(e)}
			className="rounded-md border p-4 border-darkBorder bg-darkSurface z-20 absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  md:w-1/2 md:h-1/2 w-full h-full"
			aria-label="add project form"
		>
			<div className="flex w-full items-center border-b border-darkBorder justify-between">
				<div className="flex flex-row space-x-2">
					<label htmlFor="priority">Priority</label>
					<select
						onChange={e => handlePriority(e.target.value)}
						className="bg-darkSecondary border-darkBorder border text-darkText"
						id="priority"
					>
						<option value="High">High</option>
						<option value="Medium">Medium</option>
						<option value="Low">Low</option>
					</select>
				</div>

				<button onClick={handleToggleForm}>
					<CrossSvg width={30} height={30} className="text-white " />
				</button>
			</div>
			<div className="flex pt-2 space-y-2 flex-col md:flex-row w-full space-x-2">
				<input
					value={taskTitle}
					onChange={e => handleTaskTitle(e)}
					type="text"
					placeholder="Task title"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-darkBorder outline-2  border-darkBorder bg-darkSecondary text-darkText "
				/>
				<DatePicker
					className="flex w-full text-center p-2 rounded-sm border-darkBorder bg-darkSecondary text-darkText"
					selected={targetDate}
					onChange={date => setTargetDate(date)}
				/>
			</div>
			<div className="flex pt-2 w-full flex-1">
				<textarea
					value={taskDescription}
					onChange={e => handleTaskDescription(e)}
					placeholder="Add task details"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-darkBorder outline-2 pl-2 border-darkBorder bg-darkSecondary text-darkText "
				/>
			</div>

			<div className="flex"></div>
			<div className="flex justify-between pt-2">
				<button
					onClick={handleToggleForm}
					className="p-2 md:w-36 rounded-sm border-darkBorder border"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="p-2 text-white bg-primaryGreen md:w-36 rounded-sm"
				>
					Add task
				</button>
			</div>
		</form>
	);
};

export default TaskInput;
