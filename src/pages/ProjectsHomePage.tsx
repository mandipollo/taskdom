import React from "react";
import dotMenu from "../assets/dot-menu-horizontal.svg";
import listDisplay from "../assets/list.svg";
import gridDisplay from "../assets/grid.svg";

const ProjectsHomePage = () => {
	return (
		<div className="flex flex-1 flex-col gap-4 m-10">
			<div className="flex w-full  flex-row">
				<div className="flex-1 flex">
					<p className="text-xl">Project dashboard</p>
				</div>
				<div className="flex w-1/5 flex-row gap-1">
					<p className="text-gray-400">Number of projects:</p>
					<p className="text-gray-400">Number of tasks:</p>
				</div>
			</div>
			<div className="flex flex-row w-full gap-2  ">
				<div className="flex w-1/2 justify-between">
					<p>All projects</p>
					<p>Critical projects</p>
					<p>Completed projects</p>
				</div>
				<div className="flex w-1/2">
					<div className="flex flex-1">
						<input
							className="w-full P-2 rounded-sm border  outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3] "
							type="text"
						/>
					</div>
					<div className="flex w-1/5 justify-end">
						<button>
							<img
								height={20}
								width={20}
								src={gridDisplay}
								alt="grid display"
							/>
						</button>
						<button>
							<img
								height={20}
								width={20}
								src={listDisplay}
								alt="list display"
							/>
						</button>
						<button>
							<img height={20} width={20} src={dotMenu} alt="options" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectsHomePage;
