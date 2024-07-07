import { DocumentData, Timestamp } from "firebase/firestore";
import React from "react";

import ToggleButton from "../utilities/ToggleButton";

import { useAppSelector } from "../../store/store";

import { functions } from "../../../firebase.config";
import { httpsCallable } from "firebase/functions";
import { BinSvg } from "../../assets/action/ActionSvgs";
import { CalenderSvg } from "../../assets/Icons/Icons";

interface TaskProps {
	task: {
		id: string;
		title: string;
		description: string;
		priority: string | null;
		targetDate: Timestamp;
		status: string;
		projectId: string;
		assignedMemberDisplayName: string | null;
		assignedMemberUid: string | null;
		assignedMemberImage: string | null;
	};

	handleTaskIdAndToggleAssignTask: (taskId: string) => void;
}
const Task: React.FC<TaskProps> = ({
	task,
	handleTaskIdAndToggleAssignTask,
}) => {
	const userData = useAppSelector(state => state.userFirestoreData);
	const getBgColor = (priority: string) => {
		return priority === "High"
			? "bg-red-800"
			: priority === "Medium"
			? "bg-[#006FC9]"
			: "bg-green-800";
	};

	const deleteTask = httpsCallable(functions, "taskDelete");

	const handleDelete = async (task: DocumentData) => {
		if (task) {
			await deleteTask({ projectId: task.projectId, taskId: task.id });
		}
	};

	// const handleDelete = async (task: DocumentData) => {
	// 	if (task) {
	// 		const ref = doc(db, `projects/${task.projectId}/tasks/${task.id}`);

	// 		await deleteDoc(ref);
	// 	}
	// };

	return (
		<li
			key={task.id}
			className=" border bg-white dark:border-[#161B22] shadow-md  mb-4 break-inside-avoid hover:scale-105 transition-transform duration-300 dark:bg-[#161B22] rounded-md p-2 space-y-2"
		>
			<div className="flex flex-row justify-between border-b border-[#30363E]">
				<p className="text-lg">{task.title}</p>

				<div className="flex flex-row justify-center items-center space-x-2">
					<button
						onClick={() => handleDelete(task)}
						className=" flex justify-center items-center"
					>
						<BinSvg
							width={20}
							height={20}
							className="text-black dark:text-white"
						/>
					</button>
				</div>
			</div>

			<p className="text-gray-400">{task.description}</p>
			<div className="flex flex-row space-x-2 items-center">
				{task.priority && (
					<p
						className={`${getBgColor(
							task.priority
						)} rounded-xl text-sm w-fit px-2 text-white `}
					>
						{task.priority}
					</p>
				)}

				{userData.uid && <ToggleButton task={task} userUid={userData.uid} />}
			</div>

			<div className="flex flex-row space-x-2">
				<CalenderSvg
					width={20}
					height={20}
					className="text-black dark:text-white"
				/>

				<p className="text-gray-400">
					{task.targetDate.toDate().toLocaleDateString()}
				</p>
			</div>

			<div className="flex items-center flex-row space-x-2">
				<button
					onClick={() => handleTaskIdAndToggleAssignTask(task.id)}
					className="flex dark:border rounded-md hover:border-gray-400 p-2  border-[#30363E] bg-[#006FC9] dark:bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3]"
				>
					Assign task
				</button>
				<div className="flex flex-row space-x-2">
					{task.assignedMemberImage && (
						<img
							key={task.assignedMemberUid}
							src={task.assignedMemberImage}
							className="  w-8 h-8 rounded-full object-cover"
						></img>
					)}
					{!task.assignedMemberImage && task.assignedMemberDisplayName && (
						<span
							key={task.assignedMemberUid}
							className="flex rounded-full justify-center items-center  bg-gray-300 w-8 h-8 p-2 text-black"
						>
							<p className=" flex">
								{task.assignedMemberDisplayName.charAt(0).toUpperCase()}
							</p>
						</span>
					)}
				</div>
			</div>
		</li>
	);
};

export default Task;
