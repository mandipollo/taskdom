import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

export type UserDataProps = {
	displayName: string;
	contactNo: string | null;
	jobTitle: string | null;
	email: string;
	uid: string;
	workHours: string | null;
	profileImage: string | undefined;
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
}[];

export type ProjectProps = {
	id: string;
	status: string;
	description: string;
	title: string;
};
