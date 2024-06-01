import { DocumentData, Timestamp, deleteDoc, doc } from "firebase/firestore";
import React from "react";
import calendarIcon from "../../assets/calendarIcon.svg";
import ToggleButton from "../utilities/ToggleButton";

import { useAppSelector } from "../../store/store";
import bin from "../../assets/delete.svg";
import { db } from "../../../firebase.config";

interface TaskProps {
	task: {
		id: string;
		title: string;
		description: string;
		priority: string;
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
	const userData = useAppSelector(state => state.auth);
	const getBgColor = (priority: string) => {
		return priority === "High"
			? "bg-red-800"
			: priority === "Medium"
			? "bg-blue-800"
			: "bg-green-800";
	};

	const handleDelete = async (task: DocumentData) => {
		if (task) {
			const ref = doc(
				db,
				`projects/${userData.uid}/projects/${task.projectId}/tasks/${task.id}`
			);

			await deleteDoc(ref);
		}
	};

	return (
		<li
			key={task.id}
			className="hover:border-gray-400 border border-[#161B22]  mb-4 break-inside-avoid bg-[#161B22] rounded-md p-2 space-y-2"
		>
			<div className="flex flex-row justify-between border-b border-[#30363E]">
				<p className="text-lg">{task.title}</p>

				<div className="flex flex-row justify-center items-center space-x-2">
					<button
						onClick={() => handleDelete(task)}
						className=" flex justify-center items-center"
					>
						<img width={20} height={20} src={bin}></img>
					</button>
				</div>
			</div>

			<p className="text-gray-400">{task.description}</p>
			<div className="flex flex-row space-x-2 items-center">
				<p
					className={`${getBgColor(
						task.priority
					)} rounded-xl text-sm w-fit px-2 `}
				>
					{task.priority}
				</p>

				{userData.uid && <ToggleButton task={task} userUid={userData.uid} />}
			</div>

			<div className="flex flex-row space-x-2">
				<img src={calendarIcon} alt="calendar icon" width={20} height={20} />
				<p className="text-gray-400">
					{task.targetDate.toDate().toLocaleDateString()}
				</p>
			</div>

			<div className="flex items-center flex-row space-x-2">
				<button
					onClick={() => handleTaskIdAndToggleAssignTask(task.id)}
					className="flex border hover:border-gray-400 p-2 rounded-sm border-[#30363E] bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3]"
				>
					<p>Assign task</p>
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
