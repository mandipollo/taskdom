export type userDataProps = {
	displayName: string;
	contactNo: string | null;
	jobTitle: string | null;
	email: string;
	uid: string;
	workHours: string | null;
	profileImage: string | undefined;
};

export type selectProps = {
	userUid: string;
	displayName: string;
	chatId: string;
	profileImage: string;
};
