import React from "react";

type ProjectListProps = {
	projectList: {
		id: string;
		title: string;
		description: string;
		status: string;
	}[];
};
const ProjectList: React.FC<ProjectListProps> = ({ projectList }) => {
	return (
		<div className="flex w-full h-1/2  justify-center">
			<ul className="h-full w-11/12 space-y-4 flex flex-col rounded-md border p-4 border-[#30363E] bg-[#0D1117]">
				<li className="flex justify-between">
					Your projects <button>SEE FULL LIST</button>
				</li>
				{projectList.map(project => (
					<li
						className={`${
							project.status === "TBC" ? "border-orange-400" : "border-blue-400"
						} flex border w-full p-2 `}
						key={project.id}
					>
						<p>{project.title}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProjectList;
