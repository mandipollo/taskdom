import React from "react";
import Add from "../../assets/add.svg";

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
		<div className="flex w-full z-10 mt-2  flex-col sticky top-0 left-0 bg-[#000408] ">
			<div className="flex-1 sm:flex hidden gap-4 items-center">
				<p className="text-xl">Project dashboard</p>
				<button
					onClick={() => handleToggleForm()}
					className="flex flex-row border p-2  border-[#30363E] ]"
				>
					<img src={Add} width={20} height={20} alt="" />
					Add new project
				</button>
			</div>
			<div className="flex-1 sm:hidden flex gap-4 items-center">
				<p className="text-xl">Dashboard</p>
				<button
					onClick={() => handleToggleForm()}
					className="flex flex-row border p-2  border-[#30363E] ]"
				>
					<img src={Add} width={20} height={20} alt="" />
					Add project
				</button>
			</div>

			<div className="flex flex-col lg:flex-row md:flex-col w-full gap-2  ">
				<div className="hidden w-1/2 items-center gap-4 md:flex">
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
