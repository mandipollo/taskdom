import {
	DocumentData,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
	setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { useAppSelector } from "../store/store";
import add from "../assets/add.svg";
import ProjectDetails from "../components/project/ProjectDetails";
import TaskInput from "../components/project/TaskInput";
import { v4 as uuid } from "uuid";
const ProjectsPage = () => {
	const { projectId } = useParams();

	const userUid = useAppSelector(state => state.auth.uid);

	const [projectDetails, setprojectDetails] = useState<{
		id: string;
		title: string;
		description: string;
		status: string;
	} | null>(null);

	const [isLoading, setIsLoading] = useState<Boolean>(true);
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

	useEffect(() => {
		const projectRef = doc(db, `projects/${userUid}`);
		const fetchData = async () => {
			const doc = await getDoc(projectRef);
			if (doc.exists()) {
				const project = doc
					.data()
					.projects.find((project: DocumentData) => project.id === projectId);
				setprojectDetails(project);
			}
		};

		fetchData();
		setIsLoading(false);
	}, [projectId]);

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
					.projects.findIndex(
						(project: DocumentData) => project.id === projectId
					);

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
		<div className="flex flex-col h-full w-full p-4">
			{!isLoading && (
				<>
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
					<ProjectDetails projectDetails={projectDetails} />
					<div className="h-20 p-2 flex items-center">
						<button
							onClick={handleToggleForm}
							className="rounded-md flex bg-[#0D1117] p-2"
						>
							<img src={add} width={20} height={20} alt="" />
							<p>Add Task</p>
						</button>
					</div>
					<div className="flex flex-col h-full w-full ">
						<div className="grid sm:grid-cols-3 grid-cols-1 h-full w-full  ">
							<div className="p-2">
								<p>TODO</p>

								<div className="flex-1 flex   h-full"></div>
							</div>
							<div className="p-2">
								<p>IN PROGRESS</p>

								<div className="flex-1 flex   h-full"></div>
							</div>
							<div className="p-2">
								<p>DONE</p>

								<div className="flex-1 flex  h-full"></div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ProjectsPage;
