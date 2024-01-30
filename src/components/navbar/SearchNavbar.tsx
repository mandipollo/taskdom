import React, { useState } from "react";

import {
	collection,
	query,
	where,
	getDocs,
	DocumentData,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import avatar from "../../assets/manAvatar.svg";
const SearchNavbar = () => {
	const [userName, setUserName] = useState<string | null>(null);
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
		e.code === "Enter" && handleSearch();
	};

	return (
		<div className="flex relative h-full w-10/12 justify-center items-center flex-1">
			<input
				type="text"
				onKeyDown={handleKey}
				onChange={handleUserName}
				className="flex h-full w-10/12 rounded-sm border-b outline-gray-400 pl-2"
			/>

			{err && (
				<span className="absolute flex flex-col top-full w-10/12 space-y-4 bg-black bg-opacity-50 divide-y divide-gray-400 text-white font-ephisis  p-2">
					No users found
				</span>
			)}

			{users.length > 0 && (
				<ul className="absolute flex flex-col top-full w-10/12 space-y-4 bg-black bg-opacity-50 divide-y divide-gray-400 text-white font-ephisis  p-2">
					{users.map(user => (
						<li
							key={user.uid}
							className=" flex flex-row space-x-2  items-center text-sm "
						>
							<img
								src={user.profileImage || avatar}
								width={30}
								height={30}
								alt="profile pic"
							></img>
							<p>{user.displayName}</p>
							<p>{user.jobTitle || "unavailable"}</p>
							<p>{user.workHours || "unavailable"}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchNavbar;
