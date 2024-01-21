import React, { useState } from "react";
import avatar from "../../assets/avatar.jpg";

type personalProps = {
	userFirestoreData: unknown | null;
};

const PersonalInfo: React.FC<personalProps> = ({ userFirestoreData }) => {
	const { displayName, contactNo, workHours, jobTitle } = userFirestoreData as {
		displayName: string;
		contactNo: number | null;
		workHours: number | null;
		jobTitle: string | null;
	};
	const [showEdit, setShowEdit] = useState<string>("hidden");
	const [text, setText] = useState<string>("flex");

	const inputClass = `${showEdit} focus:outline-0`;

	const editBtnDiv = `${showEdit} flex-row py-2 justify-between w-3/4`;
	const showEditHandler: React.MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		setShowEdit("flex");
		setText("hidden");
	};

	const hideEditHandler: React.MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		setShowEdit("hidden");
		setText("flex");
	};
	return (
		<div className="flex h-full w-4/5 pt-2 pl-2 md:flex-row md:space-x-10 flex-col z-10 absolute top-0 left-0 bg-white">
			<div className="h-36 w-36 overflow-hidden flex justify-center items-center rounded-full relative 0">
				<img
					src={avatar}
					height="100%"
					width="100%"
					alt="Profile picture"
					className="rounded-full "
				></img>
				<button className="absolute h-10 bottom-0 left-0 right-0  bg-gray-300">
					EDIT
				</button>
			</div>
			<form className="flex flex-col flex-1 ">
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<div className="flex justify-between">
						<p className="text-gray-400">Display Name</p>
						<button
							onClick={showEditHandler}
							className="bg-[#508D69] rounded-md px-4  text-lg text-white"
						>
							EDIT
						</button>
					</div>

					<p className={text}>{displayName}</p>
					<input type="text" className={inputClass} placeholder="mandip" />
				</div>

				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Job Title</p>
					<p className={text}>{jobTitle}</p>
					<input type="text" className={inputClass} />
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Work hours</p>
					<p className={text}>{workHours}</p>
					<input className={inputClass} type="number" />
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Contact no.</p>
					<p className={text}>{contactNo}</p>
					<input className={inputClass} type="number" />
				</div>
				<div className={editBtnDiv}>
					<button
						onClick={hideEditHandler}
						className="bg-[#508D69] rounded-md px-4  text-lg text-white"
					>
						CANCEL
					</button>
					<button
						type="submit"
						className="bg-[#508D69] rounded-md px-8  text-lg text-white"
					>
						SAVE
					</button>
				</div>
			</form>
		</div>
	);
};

export default PersonalInfo;
