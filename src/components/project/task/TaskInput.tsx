import React from "react";
import close from "../../../assets/cross.svg";

type TaskInputProps = {
	handleToggleForm: () => void;
	handleTaskTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleTaskDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
	taskDescription: string;
	taskTitle: string;
	handleTaskSubmit: (e: React.FormEvent) => void;
};
const TaskInput: React.FC<TaskInputProps> = ({
	handleToggleForm,
	handleTaskDescription,
	handleTaskTitle,
	taskDescription,
	taskTitle,
	handleTaskSubmit,
}) => {
	return (
		<form
			onSubmit={e => handleTaskSubmit(e)}
			className="rounded-md border p-4 border-[#30363E] bg-[#0D1117] z-20 absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  sm:w-1/2 sm:h-1/2 w-3/4 h-3/4"
			aria-label="add project form"
		>
			<div className="flex w-full items-center border-b border-[#30363E] justify-between">
				<p>Add a new Task</p>
				<button onClick={handleToggleForm}>
					<img src={close} alt="toggleForm" width={30} height={30} />
				</button>
			</div>
			<div className="flex pt-2 w-full">
				<input
					value={taskTitle}
					onChange={e => handleTaskTitle(e)}
					type="text"
					placeholder="Task title"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
				/>
			</div>
			<div className="flex pt-2 w-full flex-1">
				<input
					value={taskDescription}
					onChange={e => handleTaskDescription(e)}
					placeholder="Add task details"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
				/>
			</div>
			<div className="flex"></div>
			<div className="flex justify-between pt-2">
				<button className="p-2 w-36 rounded-sm border-[#30363E] border">
					Cancel
				</button>
				<button type="submit" className="p-2 bg-[#508D69] w-36 rounded-sm">
					Add task
				</button>
			</div>
		</form>
	);
};

export default TaskInput;
