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

export type MessageProps = {
	date: string;
	text?: string;
	id: string;
	senderId: string;
	image?: string;
};
