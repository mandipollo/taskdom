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
const SearchNavbar = ({
	uid,
	displayName,
	profileImage,
	contactNo,
	workHours,
	jobTitle,
	defaultPic,
}: searchProps) => {
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
		if (uid === null || uid === user.uid) {
			console.log("no uid");
			return;
		}

		// try {
		// 	const res = await getDoc(doc(db, "chats", combinedUserId));

		// 	if (!res.exists()) {
		// 		//create a chats in chat collection
		// 		await setDoc(doc(db, "chats", combinedUserId), { message: [] });
		// 	}
		// 	//create userChats

		// 	// update user's chat list
		// 	await updateDoc(doc(db, "usersChat", uid), {
		// 		[combinedUserId + ".userInfo"]: {
		// 			uid: user.uid,
		// 			profileImage: user.profileImage || null,
		// 			displayName: user.displayName,
		// 			contactNo: user.contactNo,
		// 			workHours: user.workHours,
		// 			jobTitle: user.jobTitle,
		// 		},
		// 		[combinedUserId + ".date"]: serverTimestamp(),
		// 	});

		// 	// update target user's chat list
		// 	await updateDoc(doc(db, "usersChat", user.uid), {
		// 		[combinedUserId + ".userInfo"]: {
		// 			uid: uid,
		// 			profileImage: profileImage || null,
		// 			displayName: displayName,
		// 			contactNo: contactNo,
		// 			workHours: workHours,
		// 			jobTitle: jobTitle,
		// 		},
		// 		[combinedUserId + ".date"]: serverTimestamp(),
		// 	});

		// 	console.log("connected");
		// 	setUserName("");
		// 	setUsers([]);
		// } catch (err) {
		// 	console.log(err);
		// }

		const combinedUserId = uid > user.uid ? uid + user.uid : user.uid + uid;

		try {
			// const parentRef = doc(db, "chats", combinedUserId);
			// const subCollectionRef = collection(parentRef, "message");

			// await setDoc(doc(subCollectionRef), {});

			//update user's chat list

			// update the user's chat list

			const userChatRef = doc(db, "usersChat", uid);
			const userChatSnapshot = await getDoc(userChatRef);

			// set if the userschat does not exist

			if (userChatSnapshot.exists()) {
				await updateDoc(doc(db, "usersChat", uid), {
					[combinedUserId + ".userInfo"]: {
						uid: user.uid,
						profileImage: user.profileImage || null,
						displayName: user.displayName,
						contactNo: user.contactNo,
						workHours: user.workHours,
						jobTitle: user.jobTitle,
					},
					[combinedUserId + ".date"]: serverTimestamp(),
				});
			} else {
				await setDoc(doc(db, "usersChat", uid), {
					[combinedUserId + ".userInfo"]: {
						uid: user.uid,
						profileImage: user.profileImage || null,
						displayName: user.displayName,
						contactNo: user.contactNo,
						workHours: user.workHours,
						jobTitle: user.jobTitle,
					},
					[combinedUserId + ".date"]: serverTimestamp(),
				});
			}

			// update target user's chat list
			await updateDoc(doc(db, "usersChat", user.uid), {
				[combinedUserId + ".userInfo"]: {
					uid: uid,
					profileImage: profileImage || null,
					displayName: displayName,
					contactNo: contactNo,
					workHours: workHours,
					jobTitle: jobTitle,
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
				className="flex h-full w-10/12 rounded-sm  outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3]"
			/>
			{users.length > 0 && (
				<button
					onClick={clearHandler}
					className="absolute md:right-24 right-14 p-2"
				>
					<img src={cross} width={20} height={20} alt="" />
				</button>
			)}
			{err && (
				<span className="absolute flex flex-col top-full w-10/12 space-y-4 bg-black  divide-y divide-gray-400 border-[#30363E] border p-2">
					No users found
				</span>
			)}
			{users.length > 0 && (
				<ul className="absolute flex flex-col top-full w-10/12 space-y-4 border-[#30363E] border divide-y divide-gray-400 p-2 bg-[#0D1117] ">
					{users.map(user => (
						<li
							key={user.uid}
							className=" flex flex-row space-x-2  items-center text-sm "
						>
							{profileImage ? (
								<img
									className="rounded-full w-10 h-10 object-cover"
									src={profileImage}
									alt="profile pic"
								></img>
							) : (
								<span className="text-center rounded-full bg-gray-300 h-10 w-10 p-2 text-black">
									{defaultPic}
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
