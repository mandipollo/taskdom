import { Timestamp } from "firebase/firestore";
import React from "react";

import Task from "./Task";

type TaskListProps = {
	taskList: {
		title: string;
		id: string;
		description: string;
		targetDate: Timestamp;
		status: string;
		priority: string;
		projectId: string;
		assignedMemberDisplayName: string | null;
		assignedMemberUid: string | null;
		assignedMemberImage: string | null;
	}[];
	handleTaskIdAndToggleAssignTask: (taskId: string) => void;
	filterStatus: string;
	sortBy: string;
};

const Tasks: React.FC<TaskListProps> = ({
	taskList,
	handleTaskIdAndToggleAssignTask,
	filterStatus,
	sortBy,
}) => {
	// filter task

	const filteredTask =
		filterStatus === ""
			? taskList
			: taskList.filter(task => task.status === filterStatus);

	// sort task

	const priorityOrder = ["High", "Medium", "Low"];
	const sortedTask = filteredTask.sort((a, b) => {
		if (sortBy === "Date") {
			return a.targetDate.toMillis() - b.targetDate.toMillis();
		}
		if (sortBy === "Priority") {
			return (
				priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
			);
		}

		return 0;
	});
	return (
		<div className="flex flex-col flex-1 w-full space-y-2">
			<ul className="grid auto-cols-auto lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-2 ">
				{sortedTask.map(task => (
					<Task
						task={task}
						handleTaskIdAndToggleAssignTask={handleTaskIdAndToggleAssignTask}
						key={task.id}
					/>
				))}
			</ul>
		</div>
	);
};

export default Tasks;
