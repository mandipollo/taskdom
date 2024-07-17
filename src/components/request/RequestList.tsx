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
			className="flex rounded-md shadow-md justify-center items-center p-2 flex-row  dark:bg-darkSurface"
			key={req.uid}
		>
			{req.profileImage ? (
				<img
					src={req.profileImage}
					alt="profileImage"
					className=" lg:h-20 lg:w-20  sm:h-14 sm:w-14 h-10 w-10 object-cover"
				/>
			) : (
				<span className="text-center lg:text-4xl md:text-2xl text-lg flex items-center justify-center  bg-gray-300 lg:h-20 lg:w-20  sm:h-14 sm:w-14 h-10 w-10 text-black">
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
						className="bg-[#006FC9] py-1 px-4 rounded-md text-white dark:border border-darkBorder "
					>
						Decline
					</button>
					<button
						onClick={() => handleAccept(req)}
						className=" py-1 px-4 rounded-md border border-darkBorder "
					>
						Accept
					</button>
				</div>
			</div>
		</li>
	);
};

export default RequestList;
