import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import TeamMembersList from "../components/teams/TeamMembersList";

import ChatConnections from "../components/teams/chat/ChatConnections";
import Loading from "../components/utilities/Loading";
const TeamsPage = () => {
	// loading state

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const userState = useAppSelector(state => state.userFirestoreData);

	const { uid } = userState;

	const [teamMembers, setTeamMembers] = useState<DocumentData[]>([]);

	// set a listner for team members
	useEffect(() => {
		setIsLoading(true);
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
		setIsLoading(false);

		return () => {
			unSubscribe();
		};
	}, []);

	return (
		<main className="h-full w-full  flex flex-row ">
			{isLoading && <Loading />}
			{!isLoading && <TeamMembersList teamMembers={teamMembers} />}
			{!isLoading && <ChatConnections />}
		</main>
	);
};

export default TeamsPage;
