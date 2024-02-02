import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getDoc, doc, DocumentData } from "firebase/firestore";
import { db } from "../../../firebase.config";
import TeamMembersList from "./TeamMembersList";
import TeamLists from "./TeamLists";
import { setUserChat } from "../../store/chatSlice";

export type selectProps = {
	userUid: string;
	displayName: string;
	chatId: string;
	profileImage: string;
};
const Teams = () => {
	const dispatch = useAppDispatch();

	const uid = useAppSelector(state => state.auth.uid);
	const [teamMembers, setTeamMembers] = useState<DocumentData[]>([]);

	// dispatch the selected user for chat state
	const handleSelect = ({
		chatId,
		userUid,
		displayName,
		profileImage,
	}: selectProps) => {
		dispatch(
			setUserChat({
				chatId,
				user: {
					uid: userUid,
					displayName: displayName,
					profileImage: profileImage,
				},
			})
		);
	};

	// retrieve team members from firestore
	useEffect(() => {
		const unsub = async () => {
			const res = await getDoc(doc(db, `usersChat/${uid}`));
			if (res.exists()) {
				const teamMembers = Object.entries(res.data());

				setTeamMembers(teamMembers);
			}
		};

		return () => {
			unsub();
		};
	}, []);

	return (
		<div className="h-full w-full flex flex-col">
			<TeamLists />
			<div className="flex flex-row flex-1 ml-2 border border-[#30363E] bg-[#0D1117] mt-2">
				<TeamMembersList
					handleSelect={handleSelect}
					teamMembers={teamMembers}
				/>
			</div>
		</div>
	);
};

export default Teams;
