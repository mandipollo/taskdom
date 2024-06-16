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
	userUid: string;
};

const Tasks: React.FC<TaskListProps> = ({
	taskList,
	handleTaskIdAndToggleAssignTask,
	filterStatus,
	sortBy,
	userUid,
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
			<ul className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
				{sortedTask.map(task => (
					<div key={task.id} className=" break-inside-avoid">
						<Task
							task={task}
							handleTaskIdAndToggleAssignTask={handleTaskIdAndToggleAssignTask}
							key={task.id}
						/>
					</div>
				))}
			</ul>
		</div>
	);
};

export default Tasks;
