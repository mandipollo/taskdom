import React, { useState } from "react";
import close from "../../assets/cross.svg";
import removeImg from "../../assets/delete.svg";
import "react-datepicker/dist/react-datepicker.css";
import {
	DocumentData,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { ProjectProps } from "../utilities/userDataProps";

type TaskInputProps = {
	handleToggleAddTeamMembers: () => void;
	userUid: string | null;
	projectData: ProjectProps;
	activeTeamMembers: DocumentData[];
};
const AddTeamMembers: React.FC<TaskInputProps> = ({
	handleToggleAddTeamMembers,
	userUid,
	projectData,
	activeTeamMembers,
}) => {
	const { id } = projectData;

	// role

	const [role, SetRole] = useState<string | null>(null);

	const handleSetRole = (e: string) => {
		SetRole(e);
	};
	const [searchedUser, setSearchedUser] = useState<string>("");
	const [users, setUsers] = useState<DocumentData[]>([]);

	const [err, setErr] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	const handleSearchedUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedUser(e.target.value);
	};

	// perform search on firestore users collection on key enter
	const handleSearch = async () => {
		setIsLoading(true);
		const connectionRef = collection(db, `users/${userUid}/connections`);

		// Create a query against the collection.
		const q = query(connectionRef, where("displayName", "==", searchedUser));

		try {
			const querySnapshot = await getDocs(q);

			const foundUsers: DocumentData[] = [];
			querySnapshot.forEach(doc => {
				const data = doc.data();
				if (userUid !== data.uid) foundUsers.push(data);
			});
			setUsers(foundUsers);
			setIsLoading(false);
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
		const projectRef = doc(db, `projects/${id}`);

		// update teamMembers projects docs

		const teamMemberRef = collection(db, `users/${user.uid}/userProjects`);
		try {
			if (user && role) {
				await updateDoc(projectRef, {
					teamMemberUids: arrayUnion(user.uid),
				});

				await setDoc(doc(teamMemberRef, id), {
					role: "admin",
				});

				setSearchedUser("");
				handleToggleAddTeamMembers();
				SetRole(null);
			}
		} catch (err) {
			setErr(true);
			console.log(err);
		}
	};

	// remove team members from project and update members project list

	const handleRemoveMemberList = async (memberId: string) => {
		try {
			const ref = doc(db, `projects/${id}`);

			await updateDoc(ref, {
				teamMemberUids: arrayRemove(memberId),
			});

			// update members project list

			await deleteDoc(doc(db, `users/${memberId}/userProjects/${id}`));
		} catch (err) {
			console.log(err);
		}
	};

	const handleRemoveMemberFromTasks = async (memberId: string) => {
		try {
			const assignedRef = collection(db, `projects/${id}/tasks`);

			const q = query(assignedRef, where("assignedMemberUid", "==", memberId));

			const querySnapshot = await getDocs(q);

			querySnapshot.forEach(taskDoc => {
				const ref = taskDoc.ref;

				updateDoc(ref, {
					assignedMemberUid: null,
					assignedMemberImage: null,
					assignedMemberName: null,
				});
				console.log(ref);
			});
		} catch (err) {
			console.log(err);
		}
	};
	const handleRemoveTeamMember = async (memberId: string) => {
		try {
			handleRemoveMemberList(memberId);
			handleRemoveMemberFromTasks(memberId);

			handleToggleAddTeamMembers();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
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
								<select
									className={` ${
										role ? "border-[#30363E]" : "border-red-800 animate-pulse"
									} bg-[#0D1117] border-[#30363E] border text-white p-2`}
									onChange={e => handleSetRole(e.target.value)}
								>
									<option value="Team Lead">Team Lead</option>
									<option value="Team Member">Team Member</option>
								</select>
								{projectData.adminUid === userUid && (
									<button
										type="button"
										className="bg-[#508D69] p-2 rounded-sm"
										onClick={() => handleAddMember(user)}
									>
										Add
									</button>
								)}
							</li>
						))}
					</ul>
				)}
				{users.length === 0 && !isLoading && (
					<span className="absolute flex flex-col top-full w-full space-y-4 bg-black  divide-y divide-gray-400 border-[#30363E] border p-2">
						No users found
					</span>
				)}
			</div>

			{err && (
				<span className="absolute flex flex-col top-full w-10/12 space-y-4 bg-black  divide-y divide-gray-400 border-[#30363E] border p-2">
					No users found
				</span>
			)}

			<ul className="grid grid-cols-2 overflow-hidden  p-2 w-full gap-2 flex-row">
				{activeTeamMembers.map((member: DocumentData) => (
					<li
						key={member.uid}
						className="flex rounded-md  p-2 items-center justify-between flex-row space-x-2 border-[#30363E] border"
					>
						<div className="flex flex-row space-x-2">
							{member.profileImage ? (
								<img
									src={member.profileImage}
									className=" w-12 h-12 object-cover"
								></img>
							) : (
								<span className="flex justify-center items-center  bg-gray-300 h-12 w-12 p-2 text-black">
									<p className=" flex">
										{member.displayName.charAt(0).toUpperCase()}
									</p>
								</span>
							)}
							<div className="flex flex-col justify-center ">
								<p className="text-[#508D69] uppercase">{member.displayName}</p>
								<p>{member.jobTitle}</p>
							</div>
						</div>

						<div className="flex flex-col items-end justify-end ">
							<p>{member.role}</p>
							{projectData.adminUid === userUid && (
								<button onClick={() => handleRemoveTeamMember(member.uid)}>
									<img
										src={removeImg}
										alt="remove members"
										width={20}
										height={20}
									/>
								</button>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AddTeamMembers;
