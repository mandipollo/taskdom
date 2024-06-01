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
};

const Tasks: React.FC<TaskListProps> = ({
	taskList,
	handleTaskIdAndToggleAssignTask,
	filterStatus,
}) => {
	// task assigned

	// const [assignedMembers, setAssignedMembers] = useState<DocumentData[]>([]);
	// useEffect(() => {
	// 	const fetchAssignedTasks = async () => {
	// 		try {
	// 			const assignedTasksSnapshot = await getDocs(
	// 				collection(db, "assignedTasks")
	// 			);

	// 			const assignedTaskList = assignedTasksSnapshot.docs.map(doc => ({
	// 				id: doc.id,
	// 				...doc.data(),
	// 			}));

	// 			setAssignedMembers(assignedTaskList);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	fetchAssignedTasks();
	// }, [taskList]);

	// filter task

	const filteredTask =
		filterStatus === ""
			? taskList
			: taskList.filter(task => task.status === filterStatus);

	return (
		<div className="flex flex-col flex-1 w-full space-y-2">
			<ul className="grid auto-cols-auto lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-2 ">
				{filteredTask.map(task => (
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
