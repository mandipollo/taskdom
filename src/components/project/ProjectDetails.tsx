import React from "react";
import team from "../../assets/teams.svg";

type ProjectDetailsProps = {
	projectDetails: {
		id: string;
		title: string;
		description: string;
		status: string;
	} | null;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectDetails }) => {
	return (
		<div className="h-32  flex flex-row space-x-2 border-b border-[#30363E]">
			<div className="flex h-full flex-col">
				<div className="flex h-full  w-full items-center space-x-4">
					<p className="text-bold text-lg">Project Board</p>
					<p className="text-gray-400">{projectDetails?.title}</p>
					<p className="text-[#508D69]">
						<span
							className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
							title="Project status: TBC"
						></span>
						{projectDetails?.status}
					</p>
				</div>
				<div className="flex h-full items-center w-full space-x-4">
					<img src={team} width={20} height={20}></img>
					<p>assigned to project</p>
					<button className="flex flex-row rounded-md bg-[#508D69] p-2">
						<p className="text-sm">Add member</p>
					</button>
				</div>
			</div>

			<div className="flex flex-1 h-full  ">
				<p className="text-gray-400 text-sm pt-4">
					{projectDetails?.description}
				</p>
			</div>
		</div>
	);
};

export default ProjectDetails;
