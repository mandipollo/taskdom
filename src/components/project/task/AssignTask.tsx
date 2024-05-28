import React, { useState } from "react";
import close from "../../assets/cross.svg";

import "react-datepicker/dist/react-datepicker.css";
import { DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";

type TaskInputProps = {
	taskId: string;
	handleToggleAssignTask: () => void;
	userUid: string | null;
	projectData: DocumentData;
	activeTeamMembers: {
		contactNo: string;
		displayName: string;
		email: string;
		jobTitle: string;
		profileImage: string;
		uid: string;
	}[];
};
const AssignTask: React.FC<TaskInputProps> = ({
	taskId,
	handleToggleAssignTask,
	userUid,
	projectData,
	activeTeamMembers,
}) => {
	const { id } = projectData;

	const [err, setErr] = useState<boolean>(false);

	// assign task

	const handleAddMember = async (member: DocumentData) => {
		try {
			const ref = collection(db, `assignedTasks`);

			await setDoc(doc(ref, taskId), member);
			handleToggleAssignTask();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			className="flex-1 rounded-md border p-4 border-[#010101] bg-[#0D1117] z-20 absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  sm:w-1/2 sm:h-1/2 w-3/4 h-3/4"
			aria-label="add project form"
		>
			{err && (
				<span className="absolute flex flex-col top-full w-10/12 space-y-4 bg-black  divide-y divide-gray-400 border-[#30363E] border p-2">
					No users found
				</span>
			)}

			<ul className="grid grid-cols-2 overflow-hidden  p-2 w-full gap-2 flex-row">
				{activeTeamMembers.map((member: DocumentData) => (
					<li
						onClick={() => handleAddMember(member)}
						key={member.uid}
						className="flex hover:border-gray-400 hover:cursor-pointer rounded-md p-2 flex-row space-x-2 border-[#30363E] border"
					>
						{member.profileImage ? (
							<img
								src={member.profileImage}
								className=" w-12 h-12 object-cover"
							></img>
						) : (
							<span className="flex justify-center items-center  bg-gray-300 h-12 w-12 p-2 text-black">
								<p className=" flex">
									{member.displayName.charAt(0).toUpperCase()}
								</p>
							</span>
						)}
						<div className="flex flex-col justify-center ">
							<p className="text-[#508D69] uppercase">{member.displayName}</p>
							<p className="text-gray-400">{member.jobTitle}</p>
						</div>
					</li>
				))}
			</ul>
		</form>
	);
};

export default AssignTask;
