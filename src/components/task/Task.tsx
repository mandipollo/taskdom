import { DocumentData, Timestamp } from "firebase/firestore";
import React from "react";

import ToggleButton from "../utilities/ToggleButton";

import { useAppDispatch, useAppSelector } from "../../store/store";

import { functions } from "../../../firebase.config";
import { httpsCallable } from "firebase/functions";
import { DeleteSvg } from "../../assets/action/ActionSvgs";
import { CalenderSvg } from "../../assets/Icons/Icons";

import { hideSnackbar, setSnackBar } from "../../store/snackBarSlice";
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
	// error and snackbar

	const dispatch = useAppDispatch();

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
		try {
			if (task) {
				await deleteTask({ projectId: task.projectId, taskId: task.id });
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				dispatch(setSnackBar({ show: true, message: err.message }));
				setTimeout(() => {
					dispatch(hideSnackbar());
				}, 2000);
			}
		}
	};

	return (
		<li
			key={task.id}
			className=" border  border-darkBorder shadow-md  mb-4 break-inside-avoid transition-transform duration-300 bg-darkSecondary rounded-md p-2 space-y-2"
		>
			<div className="flex flex-row justify-between border-b border-darkBorder">
				<p className="text-lg">{task.title}</p>

				<div className="flex flex-row justify-center items-center space-x-2">
					<button
						onClick={() => handleDelete(task)}
						className=" flex justify-center items-center"
					>
						<DeleteSvg width={20} height={20} className="text-white" />
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
				<CalenderSvg width={20} height={20} className="text-white" />

				<p className="text-gray-400">
					{task.targetDate.toDate().toLocaleDateString()}
				</p>
			</div>

			<div className="flex items-center flex-row space-x-2">
				<button
					onClick={() => handleTaskIdAndToggleAssignTask(task.id)}
					className="flex border rounded-md hover:border-gray-400 p-2  border-darkBorder  bg-darkSecondary placeholder-darkText text-darkText"
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
