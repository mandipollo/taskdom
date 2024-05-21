import React, { ChangeEvent, useEffect, useState } from "react";
import close from "../../assets/cross.svg";

import "react-datepicker/dist/react-datepicker.css";
import {
	DocumentData,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

type TaskInputProps = {
	handleToggleAddTeamMembers: () => void;
	userUid: string | null;
	projectData: DocumentData;
};
const AddTeamMembers: React.FC<TaskInputProps> = ({
	handleToggleAddTeamMembers,
	userUid,
	projectData,
}) => {
	const { id } = projectData;
	const [searchedUser, setSearchedUser] = useState<string>("");
	const [users, setUsers] = useState<DocumentData[]>([]);
	const [teamMembers, setTeamMembers] = useState<{}[]>([]);
	const [err, setErr] = useState<boolean>(false);

	const handleSearchedUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedUser(e.target.value);
	};
	// retrieve team members from firestore
	useEffect(() => {
		const unsub = async () => {
			const res = await getDoc(doc(db, `usersChat/${userUid}`));
			if (res.exists()) {
				const teamMembers = Object.entries(res.data()).sort(
					(a, b) => b[1].date - a[1].date
				);
				setTeamMembers(teamMembers);
			}
		};
		return () => {
			unsub();
		};
	}, [userUid]);

	// perform search on firestore users collection on key enter
	const handleSearch = async () => {
		const usersRef = collection(db, "users");

		// Create a query against the collection.
		const q = query(usersRef, where("displayName", "==", searchedUser));

		try {
			const querySnapshot = await getDocs(q);

			const foundUsers: DocumentData[] = [];
			querySnapshot.forEach(doc => {
				const data = doc.data();
				if (userUid !== data.uid) foundUsers.push(data);
				console.log(doc.data());
			});
			setUsers(foundUsers);
		} catch (err) {
			setErr(true);
			console.log(err);
		}
	};
	// trigger handle search
	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			e.preventDefault();
			e.code === "Enter" && handleSearch();
		}
	};

	// add team members to the project

	const handleAddMember = async (user: DocumentData) => {
		try {
			if (user) {
				const projectCollectionRef = collection(
					db,
					`projects/${userUid}/projects/${id}/teamMember`
				);
				await setDoc(doc(projectCollectionRef, user.uid), user);
				setSearchedUser("");
				handleToggleAddTeamMembers();
			}
		} catch (err) {
			setErr(true);
			console.log(err);
		}
	};

	return (
		<form
			className="rounded-md border p-4 border-[#010101] bg-[#0D1117] z-20 absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  sm:w-1/2 sm:h-1/2 w-3/4 h-3/4"
			aria-label="add project form"
		>
			<div className="flex relative w-full p-2 items-center border-b border-[#30363E] justify-around">
				<input
					value={searchedUser}
					onKeyDown={handleKey}
					onChange={handleSearchedUser}
					placeholder="Search for members..."
					type="text"
					className=" w-full p-2 placeholder-gray-400 border-[#30363E] bg-[#161B22] text-[#E6EDF3]"
				/>
				<button onClick={handleToggleAddTeamMembers}>
					<img src={close} alt="toggleForm" width={30} height={30} />
				</button>
				{users.length > 0 && (
					<ul className="absolute w-full  flex flex-col top-full left-0  space-y-4 border-[#30363E] border divide-y divide-gray-400 p-2 bg-[#0D1117] ">
						{users.map(user => (
							<li
								key={user.uid}
								className=" flex flex-row space-x-2  items-center text-sm "
							>
								{user.profileImage ? (
									<img
										className="rounded-full w-10 h-10 object-cover"
										src={user.profileImage}
										alt="profile pic"
									></img>
								) : (
									<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
										{user.displayName.charAt(0).toUpperCase()}
									</span>
								)}

								<p>{user.displayName.toUpperCase()}</p>
								<p className="sm:block hidden">
									{user.jobTitle || "unavailable"}
								</p>
								<p className="sm:block hidden">
									{user.workHours || "unavailable"}
								</p>
								<button
									type="button"
									className="bg-[#508D69] p-2 rounded-sm"
									onClick={() => handleAddMember(user)}
								>
									Invite
								</button>
							</li>
						))}
					</ul>
				)}
			</div>

			{err && (
				<span className="absolute flex flex-col top-full w-10/12 space-y-4 bg-black  divide-y divide-gray-400 border-[#30363E] border p-2">
					No users found
				</span>
			)}

			<ul className="flex  p-2 w-full gap-2 flex-row">
				{teamMembers.map((member: any) => (
					<li
						key={member[0]}
						className="flex rounded-md justify-center p-2 items-center flex-row space-x-2 border-[#30363E] border"
					>
						{member[1].userInfo.profileImage ? (
							<img
								src={member[1].userInfo.profileImage}
								className="rounded-full w-8 h-8 object-cover"
							></img>
						) : (
							<span className="flex justify-center items-center rounded-full bg-gray-300 h-8 w-8 p-2 text-black">
								<p className=" flex">
									{member[1].userInfo.displayName.charAt(0).toUpperCase()}
								</p>
							</span>
						)}
						<div className="flex flex-col justify-center ">
							<p className="text-[#508D69] uppercase">
								{member[1].userInfo.displayName}
							</p>
							<p>{member[1].userInfo.jobTitle}</p>
						</div>
					</li>
				))}
			</ul>
		</form>
	);
};

export default AddTeamMembers;
