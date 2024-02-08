import React, { useState } from "react";

import ProjectTeamMembers from "./ProjectTeamMembers";

import { v4 as uuid } from "uuid";
import add from "../../assets/add.svg";

import ProjectInput from "./ProjectInput";
import ProjectList from "./ProjectList";
import ProjectTaskDetails from "./ProjectTaskDetails";

const Projects: React.FC = () => {
	const [showProjectForm, setShowProjectForm] = useState<boolean>(false);
	const [projectTitle, setProjectTitle] = useState<string>("");
	const [projectDescription, setProjectDescription] = useState<string>("");
	const [projectList, setProjectList] = useState<
		{ id: string; title: string; description: string; status: string }[]
	>([]);

	const handleToggleForm = () => {
		setShowProjectForm(!showProjectForm);
	};

	// set project title

	const handleProjectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProjectTitle(e.target.value);
	};

	//set project description

	const handleProjectDescription = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setProjectDescription(e.target.value);
	};

	const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (projectTitle && projectDescription) {
			const newProject = {
				id: uuid(),
				title: projectTitle,
				description: projectDescription,
				status: "TBC",
			};

			setProjectList(prev => [...prev, newProject]);
			setProjectTitle("");
			setProjectDescription("");
			handleToggleForm();
		}
	};
	return (
		<div className="flex relative flex-row h-full w-full">
			{showProjectForm && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
					onClick={handleToggleForm}
				></div>
			)}
			{showProjectForm && (
				<ProjectInput
					projectDescription={projectDescription}
					projectTitle={projectTitle}
					handleProjectTitle={handleProjectTitle}
					handleProjectDescription={handleProjectDescription}
					handleToggleForm={handleToggleForm}
					handleProjectSubmit={handleProjectSubmit}
				/>
			)}

			<div className="flex flex-col h-full w-2/3">
				<div className="h-20 flex w-full justify-center items-center">
					<button
						onClick={handleToggleForm}
						className="flex flex-row justify-center items-center space-x-2"
					>
						<img src={add} alt="add project" width={30} height={30} />
						<p>Add Project</p>
					</button>
				</div>
				<ProjectList projectList={projectList} />
				<div className="flex h-1/2">project completeion detail</div>
			</div>
			<div className="flex flex-col w-1/3 h-full border border-[#30363E] bg-[#0D1117] ">
				<ProjectTeamMembers />
				<ProjectTaskDetails />
			</div>
		</div>
	);
};

export default Projects;
