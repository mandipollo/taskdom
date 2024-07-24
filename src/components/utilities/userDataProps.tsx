import { Timestamp } from "firebase/firestore";

export type UserDataProps = {
	displayName: string;
	contactNo: string;
	jobTitle: string;
	email: string;
	uid: string;
	workHours: string;
	profileImage: string;
};

export type SelectProps = {
	userUid: string;
	displayName: string;
	chatId: string;
	profileImage: string;
};

// export type TaskProps = {
// 	id: string;
// 	title: string;
// 	status: string;
// };

export interface TaskProps {
	assignedMemberImage: string | null;
	assignedMemberName: string | null;
	assignedMemberUid: string | null;
	description: string;
	id: string;
	priority: string;
	projectId: string;
	status: string;
	targetDate: Timestamp;

	title: string;
}
export type ProjectProps = {
	status: string;
	description: string;
	title: string;
	id: string;
	adminPhoto: string;
	adminName: string;
	startDate: Timestamp;
	endDate: Timestamp;
	adminUid: string;
	teamMemberUids: string[];
};
