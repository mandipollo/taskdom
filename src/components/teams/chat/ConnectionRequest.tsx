import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/store";
import { db } from "../../../../firebase.config";
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
	return (
		<div>
			<Link to="/connectionRequest">
				<button
					className={`${
						requestCount ? "block" : "hidden"
					} rounded-full w-2 h-2 bg-red-400`}
				></button>
			</Link>
		</div>
	);
};

export default ConnectionRequest;
