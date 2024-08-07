import {
	DocumentData,
	Timestamp,
	Unsubscribe,
	collection,
	doc,
	getDoc,
	onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, functions } from "../../firebase.config";
import { useAppSelector } from "../store/store";

import ProjectDetails from "../components/project/ProjectDetails";
import TaskInput from "../components/task/TaskInput";

import Tasks from "../components/task/Tasks";
import AddTeamMembers from "../components/project/AddTeamMembers";
import AssignTask from "../components/task/AssignTask";
import { ProjectProps } from "../components/utilities/userDataProps";
import { httpsCallable } from "firebase/functions";
import Loading from "../components/utilities/Loading";

const ProjectsPage = () => {
	// loading state

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const userUid = useAppSelector(state => state.userFirestoreData.uid);

	const url = useParams();
	const projectId = url.projectId;

	const [projectData, setProjectData] = useState<ProjectProps | undefined>(
		undefined
	);

	const [err, setErr] = useState<string | null>(null);
	// fetch project data from cloud functions

	const fetchProjectData = httpsCallable(functions, "fetchProjectData");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchProjectData({ projectId });
				const data = response.data as ProjectProps;

				setProjectData(data);
				setErr(null);
			} catch (err) {
				if (err instanceof Error) {
					setErr(err.message);
				}
			}
		};

		if (userUid) {
			fetchData();
		}
	}, [userUid]);

	const [toggleForm, setToggleForm] = useState<boolean>(false);
	const [toggleAddTeamMembers, setToggleAddTeamMembers] =
		useState<boolean>(false);

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
			assignedMemberUid: string | null;
			assignedMemberImage: string | null;
			assignedMemberDisplayName: string | null;
		}[]
	>([]);
	const [taskTitle, setTaskTitle] = useState<string>("");
	const [priority, setPriority] = useState<string | null>(null);

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
		setIsLoading(true);
		if (userUid && projectData) {
			const taskRef = collection(db, `projects/${projectData.id}/tasks`);
			unsubscribe = onSnapshot(taskRef, snapshot => {
				setTaskList([]);
				snapshot.forEach(doc => {
					const data: any = doc.data();

					setTaskList(prev => [...prev, data]);
				});
			});
			setIsLoading(false);
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [userUid, projectData]);

	const taskSubmit = httpsCallable(functions, "taskSubmit");

	const handleTaskSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (taskDescription && taskTitle && projectData && priority && targetDate) {
			const projectId = projectData.id;
			await taskSubmit({
				taskTitle,
				taskDescription,
				priority,
				targetDate,
				projectId,
			});

			setTaskDescription("");
			setTaskTitle("");
			setToggleForm(!toggleForm);
			setPriority(null);
		}
	};

	// team member collection

	const [teamMembers, setTeamMembers] = useState<DocumentData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const ref = doc(db, `projects/${projectData?.id}`);

			const projectDoc = await getDoc(ref);

			if (projectDoc.exists()) {
				const teamMembersTemp: DocumentData[] = [];
				const projectData = projectDoc.data() as ProjectProps;
				const membersArray = projectData.teamMemberUids;
				if (membersArray && membersArray.length > 0) {
					for (const memberId of membersArray) {
						const memberRef = doc(db, `users/${memberId}`);
						const memberdoc = await getDoc(memberRef);
						memberdoc.exists() && teamMembersTemp.push(memberdoc.data());
					}
					setTeamMembers(teamMembersTemp);
				}
			}
		};
		fetchData();
	}, [projectData]);
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

	// filter status

	const [filterStatus, setFilterStatus] = useState<string>("");

	const handleFilterStatus = (e: string) => {
		setFilterStatus(e);
	};

	// sort

	const [sortBy, setSortBy] = useState<string>("");

	const handleSortBy = (e: string) => {
		setSortBy(e);
	};

	return (
		<div className="flex relative flex-col w-full px-4 overflow-auto">
			{toggleForm && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
					onClick={handleToggleForm}
				></div>
			)}

			{userUid && toggleForm && projectData?.adminUid == userUid && (
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

			{err && <p>err</p>}
			{projectData && userUid && (
				<ProjectDetails
					userUid={userUid}
					filterStatus={filterStatus}
					handleToggleForm={handleToggleForm}
					teamMembers={teamMembers}
					handleToggleAddTeamMembers={handleToggleAddTeamMembers}
					projectData={projectData}
					handleFilterStatus={handleFilterStatus}
					handleSortBy={handleSortBy}
					sortBy={sortBy}
				/>
			)}

			{isLoading ? (
				<Loading />
			) : (
				<Tasks
					userUid={userUid}
					sortBy={sortBy}
					filterStatus={filterStatus}
					handleTaskIdAndToggleAssignTask={handleTaskIdAndToggleAssignTask}
					taskList={taskList}
				/>
			)}
		</div>
	);
};

export default ProjectsPage;
