import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { useAppSelector } from "../store/store";
import RequestList from "../components/request/RequestList";

const RequestPage: React.FC = () => {
	const [connectionRequest, setConnectionRequest] = useState<DocumentData[]>(
		[]
	);

	const uid = useAppSelector(state => state.auth.uid);

	useEffect(() => {
		const fetchData = async () => {
			const requestRef = collection(
				db,
				`connectionRequest/${uid}/requestReceived`
			);
			const unsubscribe = onSnapshot(requestRef, doc => {
				setConnectionRequest([]);
				doc.forEach(d => {
					const data = d.data();

					setConnectionRequest(prev => [...prev, data]);
				});
			});

			// Return a cleanup function to unsubscribe when the component unmounts
			return () => unsubscribe();
		};

		fetchData();
	}, [uid]);
	return (
		<div className="flex  p-2 w-full h-full space-x-2">
			<ul className="flex flex-row gap-2">
				{connectionRequest.map(req => (
					<RequestList key={req.uid} req={req} />
				))}
			</ul>
		</div>
	);
};

export default RequestPage;
