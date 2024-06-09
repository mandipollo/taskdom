import React, { useState } from "react";

import searchIcon from "../../assets/search.svg";

import {
	collection,
	query,
	where,
	getDocs,
	DocumentData,
	doc,
	setDoc,
	getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

import cross from "../../assets/cross.svg";

type searchProps = {
	uid: string | null;
	displayName: string | null;
	profileImage: string | undefined;
	contactNo: string | null;
	workHours: string | null;
	jobTitle: string | null;
	defaultPic: string;
};
const SearchConnections = ({
	uid,
	displayName,
	profileImage,
	contactNo,
	workHours,
	jobTitle,
}: searchProps) => {
	// search bar animation
	const [searchBar, setSearchBar] = useState<Boolean>(false);

	const handleShowSearchBar = () => {
		setSearchBar(!searchBar);
	};

	// search user
	const [userName, setUserName] = useState<string>("");
	const [users, setUsers] = useState<DocumentData[]>([]);

	const [err, setErr] = useState<boolean>(false);

	// handle displayName
	const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setUserName(e.target.value);
	};

	// perform search on firestore users collection on key enter
	const handleSearch = async () => {
		const usersRef = collection(db, "users");

		// Create a query against the collection.
		const q = query(usersRef, where("displayName", "==", userName));

		try {
			const querySnapshot = await getDocs(q);

			const foundUsers: DocumentData[] = [];
			querySnapshot.forEach(doc => {
				foundUsers.push(doc.data());
			});

			setUsers(foundUsers);
		} catch (err) {
			setErr(true);
			console.log(err);
		}
	};

	// trigger handle search
	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.code === "Enter" && handleSearch();
	};

	// search if the connection already exists

	const handleConnectionExists = async (user: DocumentData) => {
		if (!uid) return;
		const connectionListRef = doc(db, `users/${uid}/connections/${user.uid}`);
		const connectionDoc = await getDoc(connectionListRef);

		return connectionDoc.exists();
	};

	// handle user selection , send connection request, if connection already established open chat ui

	const handleRequest = async (user: DocumentData) => {
		if (uid !== null && uid !== user.uid) {
			const connectionExist = await handleConnectionExists(user);

			if (connectionExist) return;
			const requestRef = collection(
				db,
				`connectionRequest/${uid}/requestPending`
			);
			await setDoc(doc(requestRef, user.uid), user);
			const targetUserRequestRef = collection(
				db,
				`connectionRequest/${user.uid}/requestReceived`
			);
			await setDoc(doc(targetUserRequestRef, uid), {
				displayName,
				uid,
				workHours,
				jobTitle,
				profileImage,
				contactNo,
			});

			setUsers([]);
			setUserName("");
		}
	};

	// clear
	const clearHandler = () => {
		setUsers([]);
		setUserName("");
	};
	return (
		<div className="flex w-full relative">
			<input
				type="text"
				onKeyDown={handleKey}
				onChange={handleUserName}
				value={userName}
				placeholder="Search connections..."
				className={`${
					searchBar ? "w-full " : "w-8"
				}  transition-all duration-300  ease-in-out p-2  rounded-md border placeholder-gray-400  outline-[#30363E] outline-2 pl-10 border-[#30363E] bg-[#161B22] text-[#E6EDF3] `}
			/>
			<img
				onClick={handleShowSearchBar}
				className="absolute top-2 left-3"
				src={searchIcon}
				width={25}
				height={25}
				alt=""
			/>
			{users.length > 0 && (
				<button onClick={clearHandler} className="absolute right-1 p-2">
					<img src={cross} width={20} height={20} alt="" />
				</button>
			)}
			{err && (
				<span className="absolute flex flex-col top-full w-10/12 space-y-4 bg-black  divide-y divide-gray-400 border-[#30363E] border p-2">
					No users found
				</span>
			)}
			{users.length > 0 && (
				<ul className="absolute z-10 flex flex-col top-full w-full space-y-4 border-[#30363E] border divide-y divide-gray-400 p-2 bg-[#0D1117] ">
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
									{user.displayName?.charAt(0).toUpperCase()}
								</span>
							)}

							<p>{user.displayName}</p>
							<p className="sm:block hidden">
								{user.jobTitle || "unavailable"}
							</p>
							<p className="sm:block hidden">
								{user.workHours || "unavailable"}
							</p>
							<button
								className="bg-[#508D69] p-2 rounded-sm"
								// onClick={() => handleSelect(user)}
								onClick={() => handleRequest(user)}
							>
								CONNECT
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchConnections;
