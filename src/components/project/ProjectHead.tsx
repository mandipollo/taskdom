import React from "react";

type ProjectHeadProps = {
	handleToggleForm: () => void;
	handleFilterProjectStatus: (e: string) => void;
	filterProjectStatus: string;
};

const ProjectHead: React.FC<ProjectHeadProps> = ({
	handleToggleForm,
	handleFilterProjectStatus,
	filterProjectStatus,
}) => {
	return (
		<div className="flex w-full p-2 z-10 flex-col sticky top-0 left-0  bg-darkPrimary text-white ">
			<div className="flex-1 flex gap-4 items-center">
				<p className="text-xl">Dashboard</p>
				<button
					onClick={() => handleToggleForm()}
					className="flex flex-row border p-2  border-darkBorder rounded-md"
				>
					Add Project
				</button>
			</div>

			<div className="flex flex-col lg:flex-row md:flex-col w-full gap-2  ">
				<div className="hidden  items-center gap-4 md:flex">
					<p
						className={`${
							filterProjectStatus === ""
								? " underline underline-offset-4 "
								: "text-gray-400"
						} hover:cursor-pointer hidden md:block `}
						onClick={() => handleFilterProjectStatus("")}
					>
						All projects
					</p>

					<p
						onClick={() => handleFilterProjectStatus("Ongoing")}
						className={`${
							filterProjectStatus === "Ongoing"
								? " underline underline-offset-4 "
								: "text-gray-400"
						} hover:cursor-pointer `}
					>
						Ongoing projects
					</p>

					<p
						onClick={() => handleFilterProjectStatus("Complete")}
						className={`${
							filterProjectStatus === "Complete"
								? " underline underline-offset-4 "
								: "text-gray-400"
						} hover:cursor-pointer `}
					>
						Completed projects
					</p>
				</div>

				<div className="flex items-center gap-4 md:hidden ">
					<p
						className={`${
							filterProjectStatus === ""
								? " underline underline-offset-4 "
								: "text-gray-400"
						} hover:cursor-pointer `}
						onClick={() => handleFilterProjectStatus("")}
					>
						All
					</p>

					<p
						onClick={() => handleFilterProjectStatus("Ongoing")}
						className={`${
							filterProjectStatus === "Ongoing"
								? " underline underline-offset-4 "
								: "text-gray-400"
						} hover:cursor-pointer `}
					>
						Ongoing
					</p>

					<p
						onClick={() => handleFilterProjectStatus("Complete")}
						className={`${
							filterProjectStatus === "Complete"
								? " underline underline-offset-4 "
								: "text-gray-400"
						} hover:cursor-pointer `}
					>
						Completed
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProjectHead;
