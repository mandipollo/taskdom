import {
	Timestamp,
	collection,
	getCountFromServer,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../../../firebase.config";

import Project from "./project";
type ProjectlistProps = {
	projectList: {
		status: string;
		description: string;
		title: string;
		id: string;
		teamLeadPhoto: string;
		teamLeadName: string;
		startDate: Timestamp;
		endDate: Timestamp;
	}[];
	userUid: string;
};

const ProjectLists: React.FC<ProjectlistProps> = ({ projectList, userUid }) => {
	// task counts
	const [taskCounts, setTaskCounts] = useState<Record<string, number>>({});

	// get count of total tasks in a project

	const getTaskCount = async (projectId: string) => {
		const ref = collection(
			db,
			`projects/${userUid}/projects/${projectId}/tasks`
		);

		const snapshot = await getCountFromServer(ref);
		return snapshot.data().count;
	};
	useEffect(() => {
		const fetchTaskCounts = async () => {
			const counts: Record<string, number> = {};

			for (const project of projectList) {
				const count = await getTaskCount(project.id);

				counts[project.id] = count;
			}
			setTaskCounts(counts);
		};

		fetchTaskCounts();
	}, [projectList]);

	// get count of ongoing task in a project
	const [ongoingCounts, setOngoingCount] = useState<Record<string, number>>({});

	const getOngoingTasksCount = async (projectId: string) => {
		const ref = collection(
			db,
			`projects/${userUid}/projects/${projectId}/tasks`
		);

		const ongoingQuery = query(ref, where("status", "==", "Ongoing"));
		const querySnapshot = await getDocs(ongoingQuery);
		return querySnapshot.size;
	};
	useEffect(() => {
		const fetchTaskCounts = async () => {
			const ongoings: Record<string, number> = {};
			for (const project of projectList) {
				const ongoing = await getOngoingTasksCount(project.id);

				ongoings[project.id] = ongoing;
			}

			setOngoingCount(ongoings);
		};

		fetchTaskCounts();
	}, [projectList]);

	return (
		<div className="flex w-full mt-2">
			<ul className="grid grid-cols-2 w-full gap-4 ">
				{projectList.map(project => (
					<Project
						key={project.id}
						userUid={userUid}
						project={project}
						taskCounts={taskCounts}
						onGoingCounts={ongoingCounts}
					/>
				))}
			</ul>
		</div>
	);
};

export default ProjectLists;
