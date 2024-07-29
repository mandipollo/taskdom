import { useState, useEffect } from "react";

import { useAppSelector } from "../store/store";

import UpcomingMeetingDisplay from "../components/userDashboard/UpcomingMeetingDisplay";

import {
	collection,
	CollectionReference,
	doc,
	getDoc,
	getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.config";

import ProjectSnapShot from "../components/userDashboard/ProjectSnapshot";
import TaskCalendar from "../components/userDashboard/TaskCalendar";
import { TaskProps } from "../components/utilities/userDataProps";
import MessageSnap from "../components/userDashboard/MessageSnap";

const UserDashboardPage: React.FC = () => {
	const userState = useAppSelector(state => state.userFirestoreData);

	// err

	const [err, setErr] = useState<string>("");
	// fetch user project ids

	const [projectIdList, setProjectIdList] = useState<{}[]>([]);
	const [ongoingProjectCount, setOngoingProjectCount] = useState<number>(0);
	const [completedProjectCount, setCompletedProjectCount] = useState<number>(0);

	// fetch user project ids
	useEffect(() => {
		if (!userState.uid) return;

		const fetchProjectIds = async () => {
			const usersProjectRef: CollectionReference = collection(
				db,
				`users/${userState.uid}/userProjects`
			);
			setProjectIdList([]);

			try {
				const snapShot = await getDocs(usersProjectRef);
				const projectIds = snapShot.docs.map(doc => doc.id);
				setProjectIdList(projectIds);
			} catch (err) {
				if (err instanceof Error) {
					console.log(err.message);
					setErr(err.message);
				}
			}
		};

		fetchProjectIds();
	}, [userState.uid]);

	// fetch completed and ongoing projects count

	useEffect(() => {
		if (projectIdList.length === 0) return;

		const fetchData = async () => {
			let ongoingCount = 0;
			let completedCount = 0;
			for (const projectId of projectIdList) {
				const projectRef = doc(db, `projects/${projectId}`);

				try {
					const projectDoc = await getDoc(projectRef);
					const projectData = projectDoc.data();

					if (projectData && projectData.status === "Ongoing") {
						ongoingCount++;
					} else if (projectData && projectData.status === "Complete") {
						completedCount++;
					}
				} catch (err) {
					if (err instanceof Error) {
						setErr(err.message);
					}
				}
			}
			setCompletedProjectCount(completedCount);
			setOngoingProjectCount(ongoingCount);
		};

		fetchData();
	}, [projectIdList]);

	// fetch tasks status count

	const [taskList, setTaskList] = useState<TaskProps[]>([]);
	const [ongoingTaskCount, setOngoingTaskCount] = useState<number>(0);
	const [completedTaskCount, setCompletedTaskCount] = useState<number>(0);

	useEffect(() => {
		if (projectIdList.length === 0) return;

		const fetchTasks = async () => {
			let ongoingCount = 0;
			let completedCount = 0;
			const tempTaskList: TaskProps[] = [];

			for (const projectID of projectIdList) {
				const taskRef = collection(db, `projects/${projectID}/tasks`);
				const taskCollection = await getDocs(taskRef);

				taskCollection.forEach(task => {
					const taskData = task.data() as TaskProps;
					tempTaskList.push(taskData);
					if (taskData.status === "Ongoing") {
						ongoingCount++;
					} else if (taskData.status === "Complete") {
						completedCount++;
					}
				});
				setCompletedTaskCount(completedCount);
				setOngoingTaskCount(ongoingCount);
				setTaskList(tempTaskList);
			}
		};
		fetchTasks();
	}, [projectIdList]);

	return (
		<main className="flex flex-col p-2 w-full space-y-4 h-full text-black  dark:text-darkText overflow-auto">
			<section
				aria-label="project snapshot and latest message"
				className="flex gap-2 md:flex-row flex-col  items-center  "
			>
				<UpcomingMeetingDisplay />

				<div className="flex w-full h-full rounded-xl shadow-lg dark:border-darkBorder border items-center justify-center md:w-1/2 flex-col md:flex-row dark:bg-darkSecondary bg-lightPrimary p-2">
					{!err && (
						<ProjectSnapShot
							ongoingProjectCount={ongoingProjectCount}
							completedProjectCount={completedProjectCount}
							ongoingTaskCount={ongoingTaskCount}
							completedTaskCount={completedTaskCount}
						/>
					)}
					<MessageSnap />
				</div>
			</section>

			<TaskCalendar taskList={taskList} />
		</main>
	);
};

export default UserDashboardPage;
