import React, { useState } from "react";
import PersonalInfo from "../components/account/PersonalInfo";
import LoginAndSecurity from "../components/account/LoginAndSecurity";
import { useAppSelector } from "../store/store";

const AccountSettingPage: React.FC = () => {
	// const uid = auth && auth.currentUser?.uid;
	const userState = useAppSelector(state => state.userFirestoreData);

	//

	const [activeSection, setActiveSection] = useState<
		"personalInfo" | "loginAndSecurity"
	>("personalInfo");

	const handlePersonalInfo = () => {
		setActiveSection("personalInfo");
	};

	const handleSecurity = () => {
		setActiveSection("loginAndSecurity");
	};
	return (
		<main className="flex flex-col h-full w-full">
			<section className="flex h-1/6 flex-col items-center  md:mx-14 mx-2">
				<div className="flex items-center space-x-6 h-full w-full">
					<button
						aria-label="Personal info"
						onClick={handlePersonalInfo}
						className={`${
							activeSection === "personalInfo"
								? "dark:text-white"
								: "text-gray-400"
						}`}
					>
						Personal Info
					</button>
					<button
						aria-label="Login and security"
						onClick={handleSecurity}
						className={`${
							activeSection === "loginAndSecurity"
								? "dark:text-white"
								: "text-gray-400"
						}`}
					>
						Login & Security
					</button>
				</div>
			</section>
			<section className="flex  flex-1 justify-center items-center relative md:mx-14 mx-2">
				{activeSection === "personalInfo" && (
					<PersonalInfo userFirestoreData={userState} />
				)}
				{activeSection === "loginAndSecurity" && <LoginAndSecurity />}
			</section>
		</main>
	);
};

export default AccountSettingPage;
