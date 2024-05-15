import {
	DocumentData,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase.config";
import { useAppSelector } from "../store/store";
import add from "../assets/add.svg";
import ProjectDetails from "../components/project/ProjectDetails";
import TaskInput from "../components/project/task/TaskInput";
import { v4 as uuid } from "uuid";
import Tasks from "../components/project/task/Tasks";
const ProjectsPage = () => {
	const { id, description, status, teamLeadName, teamLeadPhoto, title } =
		useLocation().state;

	const userUid = useAppSelector(state => state.auth.uid);

	const [toggleForm, setToggleForm] = useState<boolean>(false);

	// task

	const [taskTitle, setTaskTitle] = useState<string>("");
	const [taskDescription, setTaskDescription] = useState<string>("");
	const [task, setTask] = useState<{
		id: string;
		title: string;
		description: string;
		status: string;
	} | null>(null);
	// fetch project deatils

	// task

	const handleToggleForm = () => {
		setToggleForm(!toggleForm);
	};

	const handleTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.target.value);
	};
	const handleTaskDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskDescription(e.target.value);
	};

	const handleTestTask = async (e: React.FormEvent) => {
		const projectRef = doc(db, `projects/${userUid}`);
	};
	const handleTaskSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const projectRef = doc(db, `projects/${userUid}`);

		if (taskDescription && taskTitle) {
			const newTask = {
				id: uuid(),
				title: taskTitle,
				description: taskDescription,
				status: "Todo",
			};

			const doc = await getDoc(projectRef);
			console.log(doc);

			if (doc.exists()) {
				const projectIndex = doc
					.data()
					.projects.findIndex((project: DocumentData) => project.id === id);

				if (projectIndex !== -1) {
					const taskRef = doc.data().projects[projectIndex];
					await updateDoc(taskRef, {
						tasks: arrayUnion(newTask),
					});
				}
			}

			setTaskDescription("");
			setTaskTitle("");
			setToggleForm(!toggleForm);
		}
	};
	return (
		<div
			className="flex relative flex-col w-full p-4 overflow-auto"
			style={{ maxHeight: " calc( 100vh - 3.5rem )" }}
		>
			{toggleForm && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
					onClick={handleToggleForm}
				></div>
			)}
			{toggleForm && (
				<TaskInput
					taskTitle={taskTitle}
					taskDescription={taskDescription}
					handleToggleForm={handleToggleForm}
					handleTaskDescription={handleTaskDescription}
					handleTaskTitle={handleTaskTitle}
					handleTaskSubmit={handleTaskSubmit}
				/>
			)}
			<ProjectDetails
				id={id}
				description={description}
				teamLeadName={teamLeadName}
				teamLeadPhoto={teamLeadPhoto}
				title={title}
				status={status}
			/>
			<div className="h-20 p-2 flex items-center">
				<button
					onClick={handleToggleForm}
					className="rounded-md flex bg-[#0D1117] p-2"
				>
					<img src={add} width={20} height={20} alt="" />
					<p>Add Task</p>
				</button>
			</div>
			<Tasks />
		</div>
	);
};

export default ProjectsPage;
