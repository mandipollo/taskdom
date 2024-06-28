import { DocumentData } from "firebase/firestore";
import React from "react";
import { useAppSelector } from "../../store/store";
import { functions } from "../../../firebase.config";
import { httpsCallable } from "firebase/functions";

interface RequestListProps {
	req: DocumentData;
}
const RequestList: React.FC<RequestListProps> = ({ req }) => {
	const currentUser = useAppSelector(state => state.userFirestoreData);

	// setup chat collection, update target connection list  and update request received/sent collection

	const handleAccept = async (req: DocumentData) => {
		const handleRequestAccept = httpsCallable(functions, "handleRequestAccept");
		await handleRequestAccept({ recipient: req, currentUser });
	};

	// update the connection decline status request for both the parties

	const handleDecline = async (req: DocumentData) => {
		const handleRequestDecline = httpsCallable(
			functions,
			"handleRequestDecline"
		);

		await handleRequestDecline({ recipient: req, currentUser });
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
