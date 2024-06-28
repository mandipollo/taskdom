import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { db } from "../../../firebase.config";
import { Link } from "react-router-dom";

const ConnectionRequest: React.FC = () => {
	const uid = useAppSelector(state => state.auth.uid);
	const [requestCount, setRequestCount] = useState<number | null>(null);

	const handleRequestCount = (e: number) => {
		setRequestCount(e);
	};

	useEffect(() => {
		const unsub = async () => {
			const connectionRef = collection(
				db,
				`connectionRequest/${uid}/requestReceived`
			);

			const connectionSnapshot = await getDocs(connectionRef);

			handleRequestCount(connectionSnapshot.size);
		};

		unsub();
	}, [uid]);

	const requestClass = `${requestCount ? "text-blue-400" : "text-white"}`;
	return (
		<Link to="/connectionRequest" className="flex flex-row space-x-1">
			<p className={requestClass}>
				Requests {requestCount && requestCount > 0 ? requestCount : ""}
			</p>
		</Link>
	);
};

export default ConnectionRequest;
