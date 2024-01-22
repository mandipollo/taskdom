import React, { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import LoginAndSecurity from "./LoginAndSecurity";
import getFirestoreData from "../../firebaseAuth/getFirestoreData";

type userData = {
	displayName: string;
	contactNo: string | null;
	jobTitle: string | null;
	email: string;
	uid: string;
	workHours: string | null;
	profileImage: string | null;
};
const AccountSetting: React.FC = () => {
	const [userFirestoreData, setUserFirestoreData] = useState<userData | null>(
		null
	);

	useEffect(() => {
		const callFirestoreData = async () => {
			const data = await getFirestoreData();
			setUserFirestoreData(data as userData);
		};
		callFirestoreData();
	}, []);

	return (
		<div className="flex flex-col h-full">
			<div className="flex h-1/5 flex-col items-center border-gray-300 border-b mx-14">
				<div className="flex items-end h-1/2 w-full">
					<p className="text-2xl font-bold">Settings</p>
				</div>
				<div className="flex items-center space-x-6 h-1/2 w-full">
					<button>Personal Info</button>
					<button>Login & Security</button>
				</div>
			</div>
			<div className="flex flex-1 justify-center items-center relative mx-14">
				<PersonalInfo userFirestoreData={userFirestoreData} />
				<LoginAndSecurity />
			</div>
		</div>
	);
};

export default AccountSetting;
