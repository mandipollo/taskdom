import React, { useState } from "react";

import { Link } from "react-router-dom";
import editImg from "../../assets/edit.svg";

import tickImg from "../../assets/tick.svg";
import crossImg from "../../assets/cross.svg";
import deleteImg from "../../assets/delete.svg";
import { functions } from "../../../firebase.config";
import PopUpConfirmation from "../utilities/PopUpConfirmation";

import ToggleButtonProject from "../archive/ToggleButtonProject";
import { ProjectProps } from "../utilities/userDataProps";
import { httpsCallable } from "firebase/functions";

interface IndividualProjectProps {
	userUid: string;
	project: ProjectProps;

	onGoingCounts: Record<string, number>;
	taskCounts: Record<string, number>;
	isTotalTaskLoading: Boolean;
	isOngoingTaskLoading: Boolean;
}
const IndividualProject: React.FC<IndividualProjectProps> = ({
	project,
	onGoingCounts,
	taskCounts,
	userUid,
	isOngoingTaskLoading,
	isTotalTaskLoading,
}) => {
	const {
		status,
		description,
		title,
		id,
		adminPhoto,
		adminName,
		startDate,
		endDate,
	} = project;

	// pop state

	const [isPopUpOpen, setIsPopUpOpen] = useState<Boolean>(false);
	const [currentAction, setCurrentAction] = useState<() => void>(() => {});

	const handleIsPopUpOpen = () => {
		setIsPopUpOpen(!isPopUpOpen);
	};

	// edit project labels
	const [isEditing, setIsEditing] = useState<Boolean>(false);
	const [editTitle, setEditTitle] = useState<string>(title);
	const [editDescription, setEditDescription] = useState<string>(description);

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
		const updateProjectFunction = httpsCallable(functions, "updateProject");
		await updateProjectFunction({
			editTitle,
			editDescription,
			id,
		});
		setIsEditing(!isEditing);
	};

	const handleDeleteProject = () => {
		const deleteProjectFunction = httpsCallable(functions, "deleteProject");
		const deleteProject = async () => {
			try {
				await deleteProjectFunction({ id });
			} catch (err) {
				console.log(err);
			}
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
			className={` ${
				status === "Complete" ? " border-gray-400 " : "border-green-400"
			}  w-full relative border-t-2 rounded-md  grid-items p-4 bg-[#161B22] text-[#E6EDF3]`}
			key={id}
		>
			<div className="sm:flex hidden md:justify-between  ">
				<div
					className="relative flex space-x-2 items-center
									 justify-center "
				>
					{isEditing ? (
						<input
							value={editTitle}
							onChange={e => handleEditTitle(e.target.value)}
							className=" rounded-md border placeholder-gray-400  outline-[#30363E] outline-2  border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
						></input>
					) : (
						<p className="text-xl  flex flex-row justify-center">{title}</p>
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

					{!isEditing && startDate && endDate && (
						<p className="text-gray-400">
							{startDate.toDate().toLocaleDateString()}-
							{endDate.toDate().toLocaleDateString()}
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
						{!isOngoingTaskLoading && !isTotalTaskLoading && (
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
			<div className=" sm:hidden flex md:justify-between  flex-col  ">
				<div className="flex flex-row">
					{isEditing ? (
						<input
							value={editTitle}
							onChange={e => handleEditTitle(e.target.value)}
							className=" rounded-md border placeholder-gray-400  outline-[#30363E] outline-2  border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
						></input>
					) : (
						<p className="text-xl  flex flex-row justify-center">{title}</p>
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
				</div>
				<div>
					{/* {startDate && endDate && (
						<p className="text-gray-400">
							{startDate && startDate.toDate().toLocaleDateString()}-
							{startDate && endDate.toDate().toLocaleDateString()}
						</p>
					)} */}

					<PopUpConfirmation
						message="Proceed?"
						isOpen={isPopUpOpen}
						onCancel={handleIsPopUpOpen}
						onConfirm={() => {
							currentAction(), setIsPopUpOpen(false);
						}}
					/>
				</div>
			</div>
			<Link
				to={`/projects/${id}`}
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
						<p className="text-gray-400 ">{description}</p>
					)}
				</div>

				<div className="flex gap-2 justify-between items-center">
					<div className="flex items-center gap-2">
						{adminPhoto ? (
							<img
								src={adminPhoto}
								className="rounded-full w-10 h-10 object-cover"
							></img>
						) : (
							<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
								{adminName.charAt(0).toUpperCase()}
							</span>
						)}
						<p className="text-gray-400">{adminName}</p>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default IndividualProject;
