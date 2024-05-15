import React from "react";
import Add from "../../assets/add.svg";

type ProjectHeadProps = {
	handleToggleForm: () => void;
};

const ProjectHead: React.FC<ProjectHeadProps> = ({ handleToggleForm }) => {
	return (
		<div className="flex w-full  flex-row">
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
		</div>
	);
};

export default ProjectHead;
