import {
	collection,
	getCountFromServer,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../../../firebase.config";
import { ProjectProps } from "../utilities/userDataProps";

import IndividualProject from "./IndividualProject";
type ProjectlistProps = {
	projectList: ProjectProps[];
	userUid: string;
	filterProjectStatus: string;
};

const ProjectLists: React.FC<ProjectlistProps> = ({
	projectList,
	userUid,
	filterProjectStatus,
}) => {
	const [isOngoingTaskLoading, setIsOngoingTaskLoading] =
		useState<Boolean>(true);

	const [isTotalTaskLoading, setIsTotalTaskLoading] = useState<Boolean>(true);

	// task counts
	const [taskCounts, setTaskCounts] = useState<Record<string, number>>({});

	// get count of total tasks in a project

	const getTaskCount = async (projectId: string) => {
		try {
			const ref = collection(db, `projects/${projectId}/tasks`);

			const snapshot = await getCountFromServer(ref);
			return snapshot.data().count;
		} catch (err) {
			console.log(err);
			return 0;
		}
	};
	useEffect(() => {
		const fetchTaskCounts = async () => {
			const counts: Record<string, number> = {};

			for (const project of projectList) {
				const count = await getTaskCount(project.id);

				counts[project.id] = count;
			}
			setTaskCounts(counts);
			setIsTotalTaskLoading(false);
		};

		fetchTaskCounts();
	}, [projectList]);

	// get count of ongoing task in a project
	const [ongoingCounts, setOngoingCount] = useState<Record<string, number>>({});

	const getOngoingTasksCount = async (projectId: string) => {
		try {
			const ref = collection(db, `projects/${projectId}/tasks`);

			const onGoingQuery = query(ref, where("status", "==", "Ongoing"));
			const querySnapshot = await getDocs(onGoingQuery);
			return querySnapshot.size;
		} catch (err) {
			console.log(err);
			return 0;
		}
	};
	useEffect(() => {
		const fetchTaskCounts = async () => {
			const ongoings: Record<string, number> = {};
			for (const project of projectList) {
				const ongoing = await getOngoingTasksCount(project.id);

				ongoings[project.id] = ongoing;
			}

			setOngoingCount(ongoings);
			setIsOngoingTaskLoading(false);
		};

		fetchTaskCounts();
	}, [projectList]);

	//filter projects

	const filteredProjects =
		filterProjectStatus === ""
			? projectList
			: projectList.filter(project => project.status === filterProjectStatus);

	// critical projects

	return (
		<div className="flex w-full mt-2">
			<ul className="grid lg:grid-cols-2 md:grid-cols-1  w-full gap-4 ">
				{filteredProjects.map(project => (
					<IndividualProject
						isOngoingTaskLoading={isOngoingTaskLoading}
						isTotalTaskLoading={isTotalTaskLoading}
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
