import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { useAppSelector } from "../store/store";
import RequestList from "../components/request/RequestList";

const RequestPage: React.FC = () => {
	const [connectionRequest, setConnectionRequest] = useState<DocumentData[]>(
		[]
	);

	const uid = useAppSelector(state => state.userFirestoreData.uid);

	useEffect(() => {
		const fetchData = async () => {
			const requestRef = collection(
				db,
				`connectionRequest/${uid}/requestReceived`
			);
			const unsubscribe = onSnapshot(requestRef, snapshot => {
				setConnectionRequest([]);
				snapshot.forEach(doc => {
					const data = doc.data();

					setConnectionRequest(prev => [...prev, data]);
				});
			});

			// Return a cleanup function to unsubscribe when the component unmounts
			return () => unsubscribe();
		};

		fetchData();
	}, [uid]);

	return (
		<div className="p-2">
			<ul className="grid 2xl:grid-cols-auto lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 ">
				{connectionRequest.map(req => (
					<RequestList key={req.uid} req={req} />
				))}
			</ul>

			{connectionRequest.length === 0 && <p>Its quiet in here....</p>}
		</div>
	);
};

export default RequestPage;
