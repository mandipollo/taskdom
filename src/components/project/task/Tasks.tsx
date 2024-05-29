import {
	DocumentData,
	Timestamp,
	collection,
	getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase.config";
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
	}[];
	handleTaskIdAndToggleAssignTask: (taskId: string) => void;
};

const Tasks: React.FC<TaskListProps> = ({
	taskList,

	handleTaskIdAndToggleAssignTask,
}) => {
	const activeClass = `text-white `;
	const liClass = `text-gray-400`;

	// task assigned

	const [assignedMembers, setAssignedMembers] = useState<DocumentData[]>([]);
	useEffect(() => {
		const fetchAssignedTasks = async () => {
			try {
				const assignedTasksSnapshot = await getDocs(
					collection(db, "assignedTasks")
				);

				const assignedTaskList = assignedTasksSnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));

				setAssignedMembers(assignedTaskList);
			} catch (err) {
				console.log(err);
			}
		};
		fetchAssignedTasks();
	}, [taskList]);

	return (
		<div className="flex flex-col flex-1 w-full space-y-2">
			<div className="flex w-full">
				<ul className="flex flex-row w-full  space-x-4">
					<li className={activeClass}>
						<button className="underline underline-offset-4">All Tasks</button>
					</li>
					<li className={liClass}>
						<button>On Going</button>
					</li>

					<li className={liClass}>
						<button>Completed</button>
					</li>
				</ul>
			</div>
			<ul className="grid auto-cols-auto lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-2 ">
				{taskList.map(task => (
					<Task
						task={task}
						handleTaskIdAndToggleAssignTask={handleTaskIdAndToggleAssignTask}
						key={task.id}
						assignedMembers={assignedMembers}
					/>
				))}
			</ul>
		</div>
	);
};

export default Tasks;
