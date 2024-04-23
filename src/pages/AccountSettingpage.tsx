import React from "react";
import PersonalInfo from "../components/account/PersonalInfo";
import LoginAndSecurity from "../components/account/LoginAndSecurity";
import { useAppSelector } from "../store/store";

const AccountSettingPage: React.FC = () => {
	// const uid = auth && auth.currentUser?.uid;
	const userState = useAppSelector(state => state.userFirestoreData);

	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex h-1/6 flex-col items-center  md:mx-14 mx-2">
				<div className="flex items-center space-x-6 h-full w-full">
					<button>Personal Info</button>
					<button>Login & Security</button>
				</div>
			</div>
			<div className="flex  flex-1 justify-center items-center relative md:mx-14 mx-2">
				<PersonalInfo userFirestoreData={userState} />
				<LoginAndSecurity />
			</div>
		</div>
	);
};

export default AccountSettingPage;
