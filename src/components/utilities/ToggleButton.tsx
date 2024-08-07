import { DocumentData, Timestamp, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase.config";

interface ToggleProps {
	task: {
		id: string;
		title: string;
		description: string;
		priority: string | null;
		targetDate: Timestamp;
		status: string;
		projectId: string;
	};
	userUid: string;
}
const ToggleButton: React.FC<ToggleProps> = ({ task }) => {
	const { id, projectId, status } = task;
	const toggleStatus = async (task: DocumentData) => {
		if (task) {
			const ref = doc(db, `projects/${projectId}/tasks/${id}`);

			if (status === "Ongoing") {
				await updateDoc(ref, {
					status: "Complete",
				});
			} else {
				await updateDoc(ref, {
					status: "Ongoing",
				});
			}
		}
	};
	return (
		<button
			onClick={toggleStatus}
			className={`w-24 h-6 flex items-center rounded-full  dark:border border-darkSecondary p-1 transition duration-300 ${
				status === "Complete" ? "bg-gray-300" : "bg-green-500"
			}`}
		>
			<div
				className={`bg-white flex flex-row relative space-x-2 justify-center items-center w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
					status === "Complete" && "translate-x-16"
				}`}
			></div>
			<p
				className={`text-black text-sm ${
					status === "Complete" && "-translate-x-2"
				}`}
			>
				{status}
			</p>
		</button>
	);
};

export default ToggleButton;
