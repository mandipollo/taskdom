import {
	DocumentData,
	collection,
	deleteDoc,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import React from "react";
import { useAppSelector } from "../../store/store";
import { db } from "../../../firebase.config";

interface RequestListProps {
	req: DocumentData;
}
const RequestList: React.FC<RequestListProps> = ({ req }) => {
	const currentUser = useAppSelector(state => state.userFirestoreData);

	// setup chat collection, update target connection list  and update request received/sent collection
	const handleAccept = async (req: DocumentData) => {
		if (currentUser && currentUser.uid) {
			// update users connection list
			const connectionsRef = collection(
				db,
				`users/${currentUser.uid}/connections`
			);
			await setDoc(doc(connectionsRef, req.uid), req);

			// update other parties connection list
			const otherPartyConnectionRef = collection(
				db,
				`users/${req.uid}/connections`
			);

			await setDoc(doc(otherPartyConnectionRef, currentUser.uid), currentUser);
			const combinedUserId =
				currentUser.uid > req.uid
					? currentUser.uid + req.uid
					: req.uid + currentUser.uid;
			try {
				const userChatRef = doc(db, "usersChat", currentUser.uid);
				const userChatSnapshot = await getDoc(userChatRef);
				// remote users chat
				const remoteChatRef = doc(db, `userschat`, req.uid);
				const remoteChatSnapShot = await getDoc(remoteChatRef);
				// set if the userschat does not exist
				if (userChatSnapshot.exists()) {
					await updateDoc(doc(db, "usersChat", currentUser.uid), {
						[combinedUserId + ".userInfo"]: {
							uid: req.uid,
							profileImage: req.profileImage || null,
							displayName: req.displayName,
							contactNo: req.contactNo,
							workHours: req.workHours,
							jobTitle: req.jobTitle,
						},
						[combinedUserId + ".date"]: serverTimestamp(),
					});
				} else {
					await setDoc(doc(db, "usersChat", currentUser.uid), {
						[combinedUserId + ".userInfo"]: {
							uid: req.uid,
							profileImage: req.profileImage || null,
							displayName: req.displayName,
							contactNo: req.contactNo,
							workHours: req.workHours,
							jobTitle: req.jobTitle,
						},
						[combinedUserId + ".date"]: serverTimestamp(),
					});
				}
				// update target user's chat list
				if (remoteChatSnapShot.exists()) {
					await updateDoc(doc(db, "usersChat", req.uid), {
						[combinedUserId + ".userInfo"]: {
							uid: currentUser.uid,
							profileImage: currentUser.profileImage || null,
							displayName: currentUser.displayName,
							contactNo: currentUser.contactNo,
							workHours: currentUser.workHours,
							jobTitle: currentUser.jobTitle,
						},
						[combinedUserId + ".date"]: serverTimestamp(),
					});
				} else {
					await setDoc(doc(db, "usersChat", req.uid), {
						[combinedUserId + ".userInfo"]: {
							uid: currentUser.uid,
							profileImage: currentUser.profileImage || null,
							displayName: currentUser.displayName,
							contactNo: currentUser.contactNo,
							workHours: currentUser.workHours,
							jobTitle: currentUser.jobTitle,
						},
						[combinedUserId + ".date"]: serverTimestamp(),
					});
				}

				// update current user request received
				const currentUserRequestReceiveRef = doc(
					db,
					`connectionRequest/${currentUser.uid}/requestReceived/${req.uid}`
				);

				await deleteDoc(currentUserRequestReceiveRef);

				// update target user request pending
				const targetUserRequestPendingRef = doc(
					db,
					`connectionRequest/${req.uid}/requestPending/${currentUser.uid}`
				);

				await deleteDoc(targetUserRequestPendingRef);
			} catch (err) {
				console.log(err);
			}
		}
	};

	// update the connection decline status request for both the parties
	const handleDecline = async (req: DocumentData) => {
		// update current user request received
		const currentUserRequestReceiveRef = doc(
			db,
			`connectionRequest/${currentUser.uid}/requestReceived/${req.uid}`
		);

		await deleteDoc(currentUserRequestReceiveRef);

		// update target user request pending
		const targetUserRequestPendingRef = doc(
			db,
			`connectionRequest/${req.uid}/requestPending/${currentUser.uid}`
		);

		await deleteDoc(targetUserRequestPendingRef);
	};
	return (
		<li
			className="flex rounded-md h-24 justify-center items-center p-2 flex-row border border-[#30363E] bg-[#0D1117]"
			key={req.uid}
		>
			{req.profileImage ? (
				<img
					src={req.profileImage}
					alt="profileImage"
					className="h-20 w-20 object-contain"
				/>
			) : (
				<span className="text-center text-2xl flex items-center justify-center rounded-full bg-gray-300 h-20 w-20 p-2 text-black">
					{req.displayName.charAt(0).toUpperCase()}
				</span>
			)}

			<div className="flex flex-col">
				<div className="h-1/2 flex justify-between px-2 ">
					<p>{req.displayName}</p>
					<p>{req.jobTitle}</p>
				</div>
				<div className="h-1/2 flex space-x-2 p-2">
					<button
						onClick={() => handleDecline(req)}
						className="bg-blue-400 py-1 px-4 rounded-md border border-[#30363E] "
					>
						Decline
					</button>
					<button
						onClick={() => handleAccept(req)}
						className=" py-1 px-4 rounded-md border border-[#30363E] "
					>
						Accept
					</button>
				</div>
			</div>
		</li>
	);
};

export default RequestList;
