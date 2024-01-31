import React, { useState } from "react";

import {
	collection,
	query,
	where,
	getDocs,
	DocumentData,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import avatar from "../../assets/manAvatar.svg";
import cross from "../../assets/cross.svg";

type searchProps = {
	uid: string | null;
	displayName: string | null;
	profileImage: string | null;
};
const SearchNavbar = ({ uid, displayName, profileImage }: searchProps) => {
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

	// handle user uid

	const handleSelect = async (user: DocumentData) => {
		// check whether the group chat exists in firestore if not create
		if (uid === null) {
			console.log("no uid");

			return;
		}

		const combinedUserId = uid > user.uid ? uid + user.uid : user.uid + uid;

		try {
			const res = await getDoc(doc(db, "chats", combinedUserId));

			if (!res.exists()) {
				//create a chats in chat collection
				await setDoc(doc(db, "chats", combinedUserId), { message: [] });
			}
			//create userChats

			await updateDoc(doc(db, "usersChat", uid), {
				[combinedUserId + ".userInfo"]: {
					uid: user.uid,
					profileImage: user.profileImage,
					displayName: user.displayName,
				},
				[combinedUserId + ".date"]: serverTimestamp(),
			});
			await updateDoc(doc(db, "usersChat", user.uid), {
				[combinedUserId + ".userInfo"]: {
					uid: uid,
					profileImage: profileImage,
					displayName: displayName,
				},
				[combinedUserId + ".date"]: serverTimestamp(),
			});

			console.log("connected");
			setUserName("");
			setUsers([]);
		} catch (err) {
			console.log(err);
		}
	};

	// clear
	const clearHandler = () => {
		setUsers([]);
		setUserName("");
	};
	return (
		<div className="flex relative h-full w-10/12 justify-center items-center flex-1">
			<input
				type="text"
				onKeyDown={handleKey}
				onChange={handleUserName}
				value={userName}
				className="flex h-full w-10/12 rounded-sm border-b outline-gray-400 pl-2"
			/>
			{users.length > 0 && (
				<button onClick={clearHandler} className="absolute right-14 p-2">
					<img src={cross} width={20} height={20} alt="" />
				</button>
			)}
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
							<p className="sm:block hidden">
								{user.jobTitle || "unavailable"}
							</p>
							<p className="sm:block hidden">
								{user.workHours || "unavailable"}
							</p>
							<button
								className="bg-[#508D69] p-2 rounded-sm"
								onClick={() => handleSelect(user)}
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

export default SearchNavbar;
