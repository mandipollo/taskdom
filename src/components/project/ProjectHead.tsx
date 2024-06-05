import React, { useState } from "react";
import Add from "../../assets/add.svg";
import dotMenu from "../../assets/dot-menu-horizontal.svg";
import listDisplay from "../../assets/list.svg";
import gridDisplay from "../../assets/grid.svg";
import searchIcon from "../../assets/search.svg";

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
	const [searchBar, setSearchBar] = useState<Boolean>(false);

	const handleShowSearchBar = () => {
		setSearchBar(!searchBar);
	};

	return (
		<div className="flex w-full z-10  flex-col sticky top-0 left-0 bg-[#000408] ">
			<div className="flex-1 flex gap-4 items-center">
				<p className="text-xl">Project dashboard</p>
				<button
					onClick={() => handleToggleForm()}
					className="flex flex-row border p-2  border-[#30363E] ]"
				>
					<img src={Add} width={20} height={20} alt="" />
					Add new project
				</button>
			</div>

			<div className="flex flex-row w-full gap-2  ">
				<div className="flex w-1/2 items-center gap-4">
					<p
						className={`${
							filterProjectStatus === ""
								? " underline underline-offset-4 "
								: "text-gray-400"
						} hover:cursor-pointer `}
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
					<p className="text-gray-400">Critical projects</p>
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
				<div className="flex w-1/2 space-x-2 ">
					<div className="flex relative flex-1 ">
						<input
							placeholder="Search projects..."
							className={`${
								searchBar ? "w-full" : "w-8"
							}  transition-all duration-300 ease-in-out p-2  rounded-md border placeholder-gray-400  outline-[#30363E] outline-2 pl-10 border-[#30363E] bg-[#161B22] text-[#E6EDF3] `}
							type="text"
						/>
						<img
							onClick={handleShowSearchBar}
							className="absolute top-2 left-3"
							src={searchIcon}
							width={25}
							height={25}
							alt=""
						/>
					</div>
					<div className="flex w-1/5 justify-end gap-1">
						<button className="border border-[#30363E] bg-[#161B22] p-2">
							<img
								height={25}
								width={25}
								src={gridDisplay}
								alt="grid display"
							/>
						</button>
						<button className="border  border-[#30363E]  p-2">
							<img
								height={25}
								width={25}
								src={listDisplay}
								alt="list display"
							/>
						</button>
						<button>
							<img height={25} width={25} src={dotMenu} alt="options" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectHead;
