import React, { useState } from "react";

import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import editImg from "../../assets/edit.svg";

import tickImg from "../../assets/tick.svg";
import crossImg from "../../assets/cross.svg";
import deleteImg from "../../assets/delete.svg";
import { db } from "../../../firebase.config";
import PopUpConfirmation from "../utilities/PopUpConfirmation";

import ToggleButtonProject from "../utilities/ToggleButtonProject";

interface ProjectProps {
	userUid: string;
	project: {
		status: string;
		description: string;
		title: string;
		id: string;
		teamLeadPhoto: string;
		teamLeadName: string;
		startDate: Timestamp;
		endDate: Timestamp;
	};

	onGoingCounts: Record<string, number>;
	taskCounts: Record<string, number>;
}
const IndividualProject: React.FC<ProjectProps> = ({
	project,
	onGoingCounts,
	taskCounts,
	userUid,
}) => {
	// pop state

	const [isPopUpOpen, setIsPopUpOpen] = useState<Boolean>(false);
	const [currentAction, setCurrentAction] = useState<() => void>(() => {});

	const handleIsPopUpOpen = () => {
		setIsPopUpOpen(!isPopUpOpen);
	};

	// ref
	const ref = doc(db, `projects/${userUid}/projects/${project.id}`);
	// edit project labels
	const [isEditing, setIsEditing] = useState<Boolean>(false);
	const [editTitle, setEditTitle] = useState<string>(project.title);
	const [editDescription, setEditDescription] = useState<string>(
		project.description
	);

	const handleIsEditing = () => {
		setIsEditing(!isEditing);
	};

	const handleEditTitle = (e: string) => {
		setEditTitle(e);
	};

	const handleEditDescription = (e: string) => {
		setEditDescription(e);
	};

	const handleSubmitEdit = async () => {
		await updateDoc(ref, {
			title: editTitle,
			description: editDescription,
		});
		setIsEditing(!isEditing);
	};

	const handleDeleteProject = () => {
		const deleteProject = async () => {
			await deleteDoc(ref);
		};
		setCurrentAction(() => deleteProject);
		setIsPopUpOpen(true);
	};
	const handleLinkClick = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		if (isEditing) {
			event.preventDefault();
		}
	};
	return (
		<li
			className={` hover:border-gray-400 relative  border-t-2 rounded-md border-green-400 grid-items p-4 bg-[#161B22] text-[#E6EDF3]`}
			key={project.id}
		>
			<div className="flex justify-between  ">
				<div
					className="relative flex flex-row space-x-2 items-center
									 justify-center "
				>
					{isEditing ? (
						<input
							value={editTitle}
							onChange={e => handleEditTitle(e.target.value)}
							className=" rounded-md border placeholder-gray-400  outline-[#30363E] outline-2  border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
						></input>
					) : (
						<p className="text-xl  flex flex-row justify-center">
							{project.title}
						</p>
					)}

					<button onClick={handleIsEditing}>
						{isEditing && (
							<img src={crossImg} alt="undo edit" width={20} height={20} />
						)}

						{!isEditing && (
							<img src={editImg} alt="edit" width={20} height={20} />
						)}
					</button>
					<button onClick={handleSubmitEdit}>
						{isEditing && (
							<img src={tickImg} alt="edit title" width={20} height={20} />
						)}
					</button>

					<button onClick={handleDeleteProject}>
						{isEditing && (
							<img
								src={deleteImg}
								alt="delete project"
								width={20}
								height={20}
							/>
						)}
					</button>

					{!isEditing && project.startDate && project.endDate && (
						<p className="text-gray-400">
							{project.startDate &&
								project.startDate.toDate().toLocaleDateString()}
							-
							{project.startDate &&
								project.endDate.toDate().toLocaleDateString()}
						</p>
					)}
				</div>
				<PopUpConfirmation
					message="Proceed?"
					isOpen={isPopUpOpen}
					onCancel={handleIsPopUpOpen}
					onConfirm={() => {
						currentAction(), setIsPopUpOpen(false);
					}}
				/>
				{!isPopUpOpen && (
					<div className="flex flex-row space-x-1">
						<ToggleButtonProject userUid={userUid} project={project} />
						{onGoingCounts && taskCounts && (
							<div className="flex flex-row">
								<p className="text-gray-400">
									Tasks:
									{onGoingCounts[project.id] !== undefined &&
										onGoingCounts[project.id]}
									/
									{taskCounts[project.id] !== undefined &&
										taskCounts[project.id]}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
			<Link
				to={`/projects/${project.id}`}
				state={project}
				className="space-y-2"
				onClick={handleLinkClick}
			>
				<div className="flex">
					{isEditing ? (
						<input
							value={editDescription}
							onChange={e => handleEditDescription(e.target.value)}
							className=" w-full rounded-md border placeholder-gray-400  outline-[#30363E] outline-2  border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
						></input>
					) : (
						<p className="text-gray-400 ">{project.description}</p>
					)}
				</div>

				<div className="flex gap-2 justify-between items-center">
					<div className="flex items-center gap-2">
						{project.teamLeadPhoto ? (
							<img
								src={project.teamLeadPhoto}
								className="rounded-full w-10 h-10 object-cover"
							></img>
						) : (
							<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
								{project.teamLeadName.charAt(0).toUpperCase()}
							</span>
						)}
						<p className="text-gray-400">{project.teamLeadName}</p>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default IndividualProject;
