import React, { useState } from "react";

import { DocumentData } from "firebase/firestore";

import { ProjectProps } from "../utilities/userDataProps";
import { TeamSvg } from "../../assets/sidebar/TeamSvg";
import { AddSvg, SortSvg } from "../../assets/action/ActionSvgs";

type ProjectDetailsProps = {
	projectData: ProjectProps;
	handleToggleAddTeamMembers: () => void;
	teamMembers: DocumentData[];
	handleToggleForm: () => void;
	handleFilterStatus: (e: string) => void;
	filterStatus: string;
	handleSortBy: (e: string) => void;
	sortBy: string;
	userUid: string;
};
const ProjectDetails: React.FC<ProjectDetailsProps> = ({
	projectData,
	handleToggleAddTeamMembers,
	teamMembers,
	handleToggleForm,
	handleFilterStatus,
	filterStatus,
	handleSortBy,
	sortBy,
	userUid,
}) => {
	const { description, title, adminName, adminPhoto } = projectData;
	const [showMore, setShowMore] = useState<boolean>(false);

	const handleToggleDescription = () => {
		setShowMore(!showMore);
	};

	const displayMembers = teamMembers && teamMembers.slice(0, 4);
	const remainingMembers = teamMembers && teamMembers.slice(4);

	// sort menu

	const [sortTask, setSortTask] = useState<boolean>(false);

	const handleSortTask = () => {
		setSortTask(!sortTask);
	};

	return (
		<div className="sticky top-0 flex flex-col space-x-2  bg-darkPrimary">
			<div className="flex h-full flex-col w-full border-b space-y-1 border-darkBorder">
				<div className="flex  w-full items-center justify-between ">
					<p className="md:text-xl text-md">{title}</p>
					<button
						onClick={() => handleToggleDescription()}
						className="mt-2 cursor-pointer p-2 border border-darkBorder rounded-md bg-darkSecondary"
						id="toggleButton"
					>
						{showMore ? "Hide" : "Project outline"}
					</button>
				</div>

				<div
					className={`${
						showMore ? "max-h-40" : "max-h-0"
					} transition-all overflow-y-auto duration-500 ease-in-out `}
				>
					<p className="text-gray-400 ">{description}</p>
				</div>

				<div className="flex items-center w-full  justify-between">
					<div className="flex items-center space-x-2 ">
						<p className="text-gray-400 hidden md:flex">Project Owner:</p>
						<p className=" text-sm">{adminName.toUpperCase()}</p>
						{adminPhoto ? (
							<img
								src={adminPhoto}
								className="rounded-full w-8 h-8 object-cover"
							></img>
						) : (
							<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 ">
								{adminName.charAt(0).toUpperCase()}
							</span>
						)}
					</div>
					<div className="flex flex-row space-x-2">
						<button
							onClick={handleToggleAddTeamMembers}
							className="flex flex-row space-x-2 p-2 border border-darkBorder bg-darkSecondary "
						>
							<TeamSvg width={20} height={20} className="text-white " />

							{!teamMembers && (
								<p className="text-gray-400">Invite Team Members</p>
							)}
						</button>

						{teamMembers && (
							<ul className="flex flex-row -space-x-2 justify-center items-center">
								{displayMembers.map(member => (
									<li
										className="flex justify-center items-center "
										key={member.uid}
									>
										{member.profileImage ? (
											<img
												src={member.profileImage}
												className="rounded-full border border-gray-400 w-8 h-8 object-cover"
											></img>
										) : (
											<span className="flex border border-gray-400 justify-center items-center rounded-full bg-gray-300 h-8 w-8 p-2 ">
												{member.displayName.charAt(0).toUpperCase()}
											</span>
										)}
									</li>
								))}
								<li className="flex justify-center items-center ">
									<span className="flex border border-gray-400 justify-center items-center rounded-full bg-gray-300 h-8 w-8 p-2 ">
										+{remainingMembers.length}
									</span>
								</li>
							</ul>
						)}
					</div>
				</div>
			</div>

			<div className="h-20  flex items-center justify-between">
				{projectData.adminUid === userUid && (
					<button
						onClick={handleToggleForm}
						className="rounded-md flex bg-darkSecondary shadow-md  p-2"
					>
						<AddSvg width={20} height={20} className="text-white " />
						Add Task
					</button>
				)}
			</div>

			<div className="flex w-full">
				<ul className="flex flex-row w-full  space-x-4">
					<li>
						<button
							className={` ${
								filterStatus === ""
									? "text-white  underline underline-offset-4"
									: "text-gray-400"
							} `}
							onClick={() => handleFilterStatus("")}
						>
							All Tasks
						</button>
					</li>
					<li>
						<button
							className={` ${
								filterStatus === "Ongoing"
									? "text-white  underline underline-offset-4"
									: "text-gray-400"
							} `}
							onClick={() => handleFilterStatus("Ongoing")}
						>
							On Going
						</button>
					</li>

					<li>
						<button
							className={` ${
								filterStatus === "Complete"
									? "text-white text:black underline underline-offset-4"
									: "text-gray-400"
							} `}
							onClick={() => handleFilterStatus("Complete")}
						>
							Completed
						</button>
					</li>
				</ul>
				<div className="relative">
					<button
						aria-label="sort "
						onClick={handleSortTask}
						className="relative"
					>
						<SortSvg width={20} height={20} className="text-white " />
					</button>
					<ul
						className={` ${
							sortTask ? "flex" : "hidden"
						} absolute rounded-md top-0 right-6 z-10 text-sm space-y-4 flex-col border border-darkBorder  w-36 p-2.5 bg-lightPrimary bg-darkSecondary `}
					>
						<li className=" text-gray-400">Sort by</li>
						<li
							onClick={() => handleSortBy("Date")}
							className={`${
								sortBy === "Date" && "underline"
							} hover:underline hover:cursor-pointer`}
						>
							Date
						</li>
						<li
							onClick={() => handleSortBy("Priority")}
							className={`${
								sortBy === "Priority" && "underline"
							} hover:underline hover:cursor-pointer`}
						>
							Priority
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
