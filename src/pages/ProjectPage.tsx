import {
	DocumentData,
	Timestamp,
	Unsubscribe,
	collection,
	doc,
	getDoc,
	onSnapshot,
	setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { useAppSelector } from "../store/store";
import add from "../assets/add.svg";
import ProjectDetails from "../components/project/ProjectDetails";
import TaskInput from "../components/project/task/TaskInput";
import { v4 as uuid } from "uuid";
import Tasks from "../components/project/task/Tasks";
import AddTeamMembers from "../components/project/AddTeamMembers";
import AssignTask from "../components/project/task/AssignTask";

interface teamMember {
	contactNo: string;
	displayName: string;
	email: string;
	jobTitle: string;
	profileImage: string;
	uid: string;
	workHours: string;
}
const ProjectsPage = () => {
	const userUid = useAppSelector(state => state.auth.uid);

	const url = useParams();
	const [projectData, setProjectData] = useState<DocumentData | undefined>(
		undefined
	);

	// retreive project data

	useEffect(() => {
		const fetchData = async () => {
			const docRef = doc(db, `projects/${userUid}/projects/${url.projectId}`);
			const data = await getDoc(docRef);
			if (data.exists()) {
				setProjectData(data.data());
			}
		};

		fetchData();
	}, []);

	const [toggleForm, setToggleForm] = useState<boolean>(false);
	const [toggleAddTeamMembers, setToggleAddTeamMembers] =
		useState<boolean>(false);

	// project firebase ref

	// task

	const [taskId, setTaskId] = useState<string>("");
	const [taskList, setTaskList] = useState<
		{
			title: string;
			id: string;
			description: string;
			targetDate: Timestamp;
			status: string;
			priority: string;
			projectId: string;
		}[]
	>([]);
	const [taskTitle, setTaskTitle] = useState<string>("");
	const [priority, setPriority] = useState<string>("Low");
	const [taskDescription, setTaskDescription] = useState<string>("");

	const [targetDate, setTargetDate] = useState<Date | null>(new Date());

	// team members

	const handleToggleAddTeamMembers = () => {
		setToggleAddTeamMembers(!toggleAddTeamMembers);
	};
	// task

	const handleToggleForm = () => {
		setToggleForm(!toggleForm);
	};

	const handleTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.target.value);
	};
	const handleTaskDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTaskDescription(e.target.value);
	};
	const handlePriority = (e: string) => {
		setPriority(e);
	};

	// retrieve tasks collection

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined;

		if (userUid && projectData) {
			const taskRef = collection(
				db,
				`projects/${userUid}/projects/${projectData.id}/tasks`
			);
			unsubscribe = onSnapshot(taskRef, snapshot => {
				setTaskList([]);
				snapshot.forEach(doc => {
					const data: any = doc.data();

					setTaskList(prev => [...prev, data]);
				});
			});
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [userUid, projectData]);

	const handleTaskSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (taskDescription && taskTitle && projectData) {
			const taskRef = collection(
				db,
				`projects/${userUid}/projects/${projectData.id}/tasks`
			);
			let id = uuid();
			const newTask = {
				id,
				title: taskTitle,
				description: taskDescription,
				status: "Ongoing",
				priority: priority,
				targetDate: targetDate,
				projectId: projectData.id,
			};

			await setDoc(doc(taskRef, id), newTask);

			setTaskDescription("");
			setTaskTitle("");
			setToggleForm(!toggleForm);
		}
	};

	// team member collection

	const [teamMembers, setTeamMembers] = useState<teamMember[]>([]);

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined;

		if (userUid && projectData) {
			const teamMemberRef = collection(
				db,
				`projects/${userUid}/projects/${projectData.id}/teamMember`
			);
			unsubscribe = onSnapshot(teamMemberRef, async snapshot => {
				setTeamMembers([]);

				snapshot.forEach(async member => {
					const { uid }: DocumentData = member.data();
					const ref = doc(db, `users`, uid);
					const memberData = await getDoc(ref);
					if (memberData.exists()) {
						const data = memberData.data() as teamMember;

						setTeamMembers(prev => [...prev, data]);
					}
				});
			});
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [userUid, projectData]);
	// assign task

	const [toggleAssignTask, setToggleAssignTask] = useState<Boolean>(false);

	const handleToggleAssignTask = () => {
		setToggleAssignTask(!toggleAssignTask);
	};
	// send taskId to add members component
	const handleTaskIdAndToggleAssignTask = (e: string) => {
		setTaskId(e);
		handleToggleAssignTask();
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
					targetDate={targetDate}
					setTargetDate={setTargetDate}
					handlePriority={handlePriority}
					taskTitle={taskTitle}
					taskDescription={taskDescription}
					handleToggleForm={handleToggleForm}
					handleTaskDescription={handleTaskDescription}
					handleTaskTitle={handleTaskTitle}
					handleTaskSubmit={handleTaskSubmit}
				/>
			)}
			{toggleAddTeamMembers && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
					onClick={handleToggleAddTeamMembers}
				></div>
			)}
			{toggleAddTeamMembers && projectData && (
				<AddTeamMembers
					activeTeamMembers={teamMembers}
					projectData={projectData}
					userUid={userUid}
					handleToggleAddTeamMembers={handleToggleAddTeamMembers}
				/>
			)}

			{projectData && (
				<ProjectDetails
					teamMembers={teamMembers}
					handleToggleAddTeamMembers={handleToggleAddTeamMembers}
					projectData={projectData}
				/>
			)}

			{toggleAssignTask && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
					onClick={handleToggleAssignTask}
				></div>
			)}

			{toggleAssignTask && projectData && (
				<AssignTask
					taskId={taskId}
					userUid={userUid}
					activeTeamMembers={teamMembers}
					handleToggleAssignTask={handleToggleAssignTask}
					projectData={projectData}
				/>
			)}

			<div className="h-20 p-2 space-x-2 flex items-center justify-between">
				<button
					onClick={handleToggleForm}
					className="rounded-md flex bg-[#0D1117] p-2"
				>
					<img src={add} width={20} height={20} alt="" />
					<p>Add Task</p>
				</button>
			</div>

			<Tasks
				handleTaskIdAndToggleAssignTask={handleTaskIdAndToggleAssignTask}
				taskList={taskList}
			/>
		</div>
	);
};

export default ProjectsPage;
