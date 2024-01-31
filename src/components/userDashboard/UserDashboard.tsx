import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

import { useAppSelector } from "../../store/store";
import DateTaskDisplay from "./DateTaskDisplay";
import UpcomingMeetingDisplay from "./UpcomingMeetingDisplay";
import TaskDashboard from "./TaskDashboard";

const UserDashboard: React.FC = () => {
	const userState = useAppSelector(state => state.userFirestoreData);

	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000); // Update every second

		return () => clearInterval(intervalId); // Cleanup on component unmount
	}, []); // Empty dependency array ensures the effect runs only once

	const day = currentDateTime.toLocaleString("en-UK", { weekday: "long" });
	const date = currentDateTime.toLocaleString("en-US", {
		day: "numeric",
	});
	const time = currentDateTime.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true, // Use 12-hour clock format
	});

	return (
		<div className="flex flex-row  h-full  bg-[#000408] text-[#E6EDF3]">
			<Sidebar />
			<div className="flex w-4/5 flex-col ">
				<div className="flex justify-center items-center h-1/2  ">
					<div className="flex sm:w-2/3 w-full p-2 h-full">
						<DateTaskDisplay date={date} day={day} time={time} />
						<UpcomingMeetingDisplay profileImage={userState.profileImage} />
					</div>
					<TaskDashboard />
				</div>
				<div className="flex justify-center items-center h-1/2 bg-[#0D1117] border-[#30363E] border "></div>
			</div>
		</div>
	);
};

export default UserDashboard;
