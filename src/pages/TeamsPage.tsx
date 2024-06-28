import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import TeamMembersList from "../components/teams/TeamMembersList";

import ChatConnections from "../components/teams/chat/ChatConnections";
const TeamsPage = () => {
	const userState = useAppSelector(state => state.userFirestoreData);

	const { uid } = userState;

	const [teamMembers, setTeamMembers] = useState<DocumentData[]>([]);

	// set a listner for team members
	useEffect(() => {
		const unSubscribe = onSnapshot(
			collection(db, `users/${uid}/connections`),
			doc => {
				setTeamMembers([]);
				doc.forEach(doc => {
					const teamMembers = doc.data();

					setTeamMembers(prev => [...prev, teamMembers]);
				});
			}
		);

		return () => {
			unSubscribe();
		};
	}, []);

	return (
		<div className="h-full w-full  flex flex-col space-y-2">
			<div className="flex flex-row flex-1 space-x-1 ">
				<TeamMembersList teamMembers={teamMembers} />
				<ChatConnections />
			</div>
		</div>
	);
};

export default TeamsPage;
