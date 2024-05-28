import { collection, getCountFromServer } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase.config";

type ProjectlistProps = {
	projectList: {
		status: string;
		description: string;
		title: string;
		id: string;
		teamLeadPhoto: string;
		teamLeadName: string;
	}[];
	userUid: string;
};

const ProjectLists: React.FC<ProjectlistProps> = ({ projectList, userUid }) => {
	const [taskCounts, setTaskCounts] = useState<Record<string, number>>({});
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

	return (
		<div className="flex w-full ">
			<ul className="grid grid-cols-2 w-full gap-4">
				{projectList.map(project => (
					<li
						className={` hover:border-gray-400 border-t-2 rounded-md border-green-400 grid-items p-4 bg-[#161B22] text-[#E6EDF3]`}
						key={project.id}
					>
						<Link to={`/projects/${project.id}`} state={project}>
							<div className="flex flex-1 flex-col gap-4">
								<div className="flex justify-between ">
									<div>
										<p className="text-xl"> {project.title}</p>
									</div>
									<div className="flex flex-row">
										<p className="text-gray-400">Tasks: </p>
										<p>
											{taskCounts[project.id] !== undefined
												? taskCounts[project.id]
												: "Loading..."}
										</p>
									</div>
								</div>
								<div className="flex">
									<p className="text-gray-400">{project.description}</p>
								</div>
								<div className="border-gray-400 border-t"></div>
								<div className="flex gap-2">
									<div className="flex items-center gap-2">
										{project.teamLeadPhoto ? (
											<img
												src={project.teamLeadPhoto}
												className="rounded-full w-10 h-10 object-cover"
											></img>
										) : (
											<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
												{project.teamLeadName.charAt(0).toUpperCase()}
											</span>
										)}
										<p className="text-gray-400">{project.teamLeadName}</p>
									</div>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProjectLists;
