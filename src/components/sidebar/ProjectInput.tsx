import React from "react";
import close from "../../assets/cross.svg";

type ProjectInputProps = {
	handleProjectTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleProjectDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleToggleForm: () => void;
	handleProjectSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	projectTitle: string;
	projectDescription: string;
};
const ProjectInput: React.FC<ProjectInputProps> = ({
	handleProjectDescription,
	handleProjectSubmit,
	handleProjectTitle,
	handleToggleForm,
	projectDescription,
	projectTitle,
}) => {
	return (
		<form
			onSubmit={handleProjectSubmit}
			className="rounded-md border p-4 border-[#30363E] bg-[#0D1117] z-10 absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  sm:w-1/2 sm:h-1/2 w-3/4 h-3/4"
			aria-label="add project form"
		>
			<div className="flex w-full items-center border-b border-[#30363E] justify-between">
				<p>Add a new project</p>
				<button onClick={handleToggleForm}>
					<img src={close} alt="toggleForm" width={30} height={30} />
				</button>
			</div>
			<div className="flex pt-2 w-full">
				<input
					onChange={e => handleProjectTitle(e)}
					value={projectTitle}
					type="text"
					placeholder="Project name"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
				/>
			</div>
			<div className="flex pt-2 w-full flex-1">
				<textarea
					onChange={e => handleProjectDescription(e)}
					value={projectDescription}
					placeholder="Add project details"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
				/>
			</div>
			<div className="flex"></div>
			<div className="flex justify-between pt-2">
				<button className="p-2 w-36 rounded-sm border-[#30363E] border">
					Cancel
				</button>
				<button type="submit" className="p-2 bg-[#508D69] w-36 rounded-sm">
					Add project
				</button>
			</div>
		</form>
	);
};

export default ProjectInput;
