import React from "react";

import { CrossSvg } from "../../assets/action/ActionSvgs";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type ProjectInputProps = {
	handleProjectTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleProjectDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleToggleForm: () => void;
	handleProjectSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	projectTitle: string;
	projectDescription: string;
	startDate: Date | null;
	endDate: Date | null;
	setStartDate: (date: Date | null) => void;
	setEndDate: (date: Date | null) => void;
};
const ProjectInput: React.FC<ProjectInputProps> = ({
	handleProjectDescription,
	handleProjectSubmit,
	handleProjectTitle,
	handleToggleForm,
	projectDescription,
	projectTitle,
	startDate,
	endDate,
	setStartDate,
	setEndDate,
}) => {
	return (
		<form
			id="projectInput"
			onSubmit={handleProjectSubmit}
			className="rounded-md border p-4 border-darkBorder bg-lightPrimary dark:bg-darkSurface z-10 absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  sm:w-1/2 sm:h-1/2 w-3/4 h-3/4"
			aria-label="add project form"
		>
			<div className="flex w-full items-center border-b border-darkBorder justify-between">
				<div className="flex flex-row space-x-1 justify-center items-center">
					<p>Add a new project</p>
					<DatePicker
						className="flex text-center p-2 rounded-sm border-darkBorder dark:bg-darkSurface dark:text-darkText"
						selected={startDate}
						onChange={date => setStartDate(date)}
					/>
					<DatePicker
						className="flex text-center p-2 rounded-sm border-darkBorder dark:bg-darkSurface dark:text-darkText"
						selected={endDate}
						onChange={date => setEndDate(date)}
					/>
				</div>

				<button onClick={handleToggleForm}>
					<CrossSvg
						width={30}
						height={30}
						className="text-black dark:text-white"
					/>
				</button>
			</div>
			<div className="flex pt-2 w-full">
				<input
					onChange={e => handleProjectTitle(e)}
					value={projectTitle}
					type="text"
					placeholder="Project name"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-darkBorder outline-2 pl-2 border-darkBorder dark:bg-darkSecondary dark:text-darkText "
				/>
			</div>
			<div className="flex pt-2 w-full flex-1">
				<textarea
					onChange={e => handleProjectDescription(e)}
					value={projectDescription}
					placeholder="Add project details"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-darkBorder outline-2 pl-2 border-darkBorder dark:bg-darkSecondary dark:text-darkText  "
				/>
			</div>
			<div className="flex"></div>
			<div className="flex justify-between pt-2">
				<button
					onClick={handleToggleForm}
					className="p-2 w-36 rounded-sm border-darkBorder border"
				>
					Cancel
				</button>
				<button type="submit" className="p-2 bg-primaryBlue w-36 rounded-sm">
					Add project
				</button>
			</div>
		</form>
	);
};

export default ProjectInput;
