import React from "react";
import PersonalInfo from "./PersonalInfo";
import LoginAndSecurity from "./LoginAndSecurity";
import { useAppSelector } from "../../store/store";

const AccountSetting: React.FC = () => {
	// const uid = auth && auth.currentUser?.uid;
	const userState = useAppSelector(state => state.userFirestoreData);

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex h-1/5 flex-col items-center  mx-14">
				<div className="flex items-end h-1/2 w-full">
					<p className="text-2xl font-bold">Settings</p>
				</div>
				<div className="flex items-center space-x-6 h-1/2 w-full">
					<button>Personal Info</button>
					<button>Login & Security</button>
				</div>
			</div>
			<div className="flex flex-1 justify-center items-center relative mx-14">
				<PersonalInfo userFirestoreData={userState} />
				<LoginAndSecurity />
			</div>
		</div>
	);
};

export default AccountSetting;
