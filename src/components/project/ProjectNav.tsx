import React from "react";
import dotMenu from "../../assets/dot-menu-horizontal.svg";
import listDisplay from "../../assets/list.svg";
import gridDisplay from "../../assets/grid.svg";
import searchIcon from "../../assets/search.svg";

const ProjectNav: React.FC = () => {
	return (
		<div className="flex flex-row w-full gap-2  ">
			<div className="flex w-1/2 items-center gap-4">
				<p className="underline underline-offset-4 ">All projects</p>
				<p className="text-gray-400">Critical projects</p>
				<p className="text-gray-400">Completed projects</p>
			</div>
			<div className="flex w-1/2  ">
				<div className="flex relative flex-1">
					<input
						placeholder="Search projects..."
						className="w-full p-2  rounded-md border placeholder-gray-400  outline-[#30363E] outline-2 pl-10 border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
						type="text"
					/>
					<img
						className="absolute top-2 left-2"
						src={searchIcon}
						width={25}
						height={25}
						alt=""
					/>
				</div>
				<div className="flex w-1/5 justify-end gap-1">
					<button className="border border-[#30363E] bg-[#161B22] p-2">
						<img height={25} width={25} src={gridDisplay} alt="grid display" />
					</button>
					<button className="border  border-[#30363E]  p-2">
						<img height={25} width={25} src={listDisplay} alt="list display" />
					</button>
					<button>
						<img height={25} width={25} src={dotMenu} alt="options" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectNav;
