import React, { useState } from "react";
import team from "../../assets/teams.svg";

type ProjectDetailsProps = {
	id: string;
	status: string;
	teamLeadName: string;
	teamLeadPhoto: string;
	title: string;
	description: string;
};
const ProjectDetails: React.FC<ProjectDetailsProps> = ({
	id,
	status,
	teamLeadName,
	teamLeadPhoto,
	title,
	description,
}) => {
	const [showMore, setShowMore] = useState<boolean>(false);

	const handleToggleDescription = () => {
		setShowMore(!showMore);
	};

	return (
		<div className=" flex flex-row space-x-2 border-b border-[#30363E]">
			<div className="flex h-full flex-col w-full">
				<div className="flex h-full  w-full items-center justify-between ">
					<p className="text-xl">{title}</p>
					<button
						onClick={() => handleToggleDescription()}
						className="mt-2 cursor-pointer w-40  p-2 border border-[#30363E] bg-[#0D1117]"
						id="toggleButton"
					>
						{showMore ? "Hide" : "Project outline"}
					</button>
				</div>

				<div
					className={`${
						showMore ? "h-auto" : " h-0 "
					} overflow-hidden transition-height duration-500 ease-in-out `}
				>
					<p className="text-gray-400">{description}</p>
				</div>

				<div className="flex h-full items-center w-full py-2  justify-between">
					<div className="flex items-center space-x-2 ">
						<p className="text-gray-400">Team Lead:</p>
						<p className=" text-sm">{teamLeadName.toUpperCase()}</p>
						{teamLeadPhoto ? (
							<img
								src={teamLeadPhoto}
								className="rounded-full w-8 h-8 object-cover"
							></img>
						) : (
							<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
								{teamLeadName.charAt(0).toUpperCase()}
							</span>
						)}
					</div>
					<div className="flex flex-row space-x-2">
						<img src={team} width={20} height={20}></img>
						<span className=" flex  justify-center items-center text-center rounded-full bg-gray-300 h-8 w-8 p-2 text-black">
							{teamLeadName.charAt(0).toUpperCase()}
						</span>
						<span className=" flex  justify-center items-center text-center rounded-full bg-gray-300 h-8 w-8 p-2 text-black">
							{teamLeadName.charAt(0).toUpperCase()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
