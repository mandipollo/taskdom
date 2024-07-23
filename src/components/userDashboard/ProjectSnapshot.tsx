import React from "react";
import { EditSvg, TickSvg } from "../../assets/action/ActionSvgs";
interface ProjectSnapShotProps {
	ongoingProjectCount: number;
	completedProjectCount: number;
	ongoingTaskCount: number;
	completedTaskCount: number;
}

const ProjectSnapShot: React.FC<ProjectSnapShotProps> = ({
	ongoingProjectCount,
	completedProjectCount,
	ongoingTaskCount,
	completedTaskCount,
}) => {
	return (
		<section className=" bg-lightPrimary dark:bg-darkSecondary flex justify-center items-center shadow-xl rounded-2xl flex-col w-1/2 h-full p-2 gap-2">
			<div className="w-full flex flex-row space-x-2">
				<p>{ongoingProjectCount + completedProjectCount}</p>
				<p className="text-gray-400">Total Project</p>
			</div>
			<div className="flex flex-row gap-2 w-full justify-center">
				<div className="flex justify-center items-center flex-row border dark:border-darkBorder gap-2 p-2 rounded-md">
					<EditSvg
						height={20}
						width={20}
						className="text-black dark:text-white"
					/>

					<div>
						<p className="text-gray-400">In Progress</p>
						{ongoingProjectCount}
					</div>
				</div>
				<div className="flex justify-center items-center flex-row border dark:border-darkBorder  gap-2 p-2 rounded-md">
					<TickSvg
						height={20}
						width={20}
						className="text-black dark:text-white"
					/>

					<div>
						<p className="text-gray-400">Completed</p>
						{completedProjectCount}
					</div>
				</div>
			</div>
			<div className="w-full flex flex-row space-x-2">
				<p>{ongoingTaskCount + completedTaskCount}</p>
				<p className="text-gray-400">Total Task</p>
			</div>
			<div className="flex flex-row gap-2 w-full justify-center">
				<div className="flex justify-center items-center flex-row border dark:border-darkBorder  gap-2 p-2 rounded-md">
					<EditSvg
						height={20}
						width={20}
						className="text-black dark:text-white"
					/>

					<div>
						<p className="text-gray-400">In Progress</p>
						{ongoingTaskCount}
					</div>
				</div>
				<div className="flex justify-center items-center flex-row border dark:border-darkBorder  gap-2 p-2 rounded-md">
					<TickSvg
						height={20}
						width={20}
						className="text-black dark:text-white"
					/>

					<div>
						<p className="text-gray-400">Completed</p>
						{completedTaskCount}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProjectSnapShot;
