import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
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

export type TaskProps = {
	id: string;
	title: string;
	status: string;
};

export type UserCallProps = {
	uid: number | string;
	videoTrack: ICameraVideoTrack | undefined;
	audioTrack: IMicrophoneAudioTrack | undefined;
};

export type ProjectListProps = {
	status: string;
	description: string;
	title: string;
	id: string;
	teamLeadPhoto: string;
	teamLeadName: string;
	startDate: Timestamp;
	endDate: Timestamp;
}[];

export type ProjectProps = {
	id: string;
	status: string;
	description: string;
	title: string;
};
