import React from "react";

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
			className="rounded-md  p-4  bg-darkSurface z-20 absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  md:w-1/2 md:h-1/2 w-full h-full"
			aria-label="add project form"
		>
			<div className="flex w-full items-center border-b border-darkBorder justify-between">
				<div className="flex gap-2 md:flex-row flex-col justify-center items-center">
					<DatePicker
						className="flex text-center p-2 rounded-sm border border-darkBorder bg-darkSurface text-darkText"
						selected={startDate}
						onChange={date => setStartDate(date)}
					/>
					<DatePicker
						className="flex text-center p-2 rounded-sm border border-darkBorder bg-darkSurface text-darkText"
						selected={endDate}
						onChange={date => setEndDate(date)}
					/>
				</div>
			</div>
			<div className="flex pt-2 w-full">
				<input
					onChange={e => handleProjectTitle(e)}
					value={projectTitle}
					type="text"
					placeholder="Project name"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-darkBorder outline-2 pl-2 border border-darkBorder bg-darkSecondary text-darkText "
				/>
			</div>
			<div className="flex pt-2 w-full flex-1">
				<textarea
					onChange={e => handleProjectDescription(e)}
					value={projectDescription}
					placeholder="Add project details"
					className="p-2 w-full rounded-sm placeholder-gray-400 outline-darkBorder outline-2 pl-2 border border-darkBorder bg-darkSecondary text-darkText  "
				/>
			</div>
			<div className="flex"></div>
			<div className="flex justify-between pt-2">
				<button
					onClick={handleToggleForm}
					className="p-2 md:w-36 rounded-sm border-darkBorder border"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="p-2 text-white bg-primaryGreen md:w-36 rounded-sm"
				>
					Add project
				</button>
			</div>
		</form>
	);
};

export default ProjectInput;
