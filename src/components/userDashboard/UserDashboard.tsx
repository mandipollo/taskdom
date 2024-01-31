import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

import { useAppSelector } from "../../store/store";
import Calendar from "../calendar/Calendar";

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
	return (
		<div className="flex flex-row  h-full">
			<Sidebar />
			<div className="flex w-4/5 flex-col">
				<div className="flex justify-center items-center h-1/2 bg-slate-200 ">
					<div className="flex sm:w-2/3 w-full p-2 h-full">
						<div className="flex w-1/3 ">
							<div className="flex flex-col h-full w-full justify-center p-2 space-y-4  ">
								<p className=" text-2xl font-montserrat">{day}</p>
								<p className=" text-2xl">{date}</p>
								<p className="text-sm">Hi user, you have 13 tasks today</p>
							</div>
						</div>
						<div className="flex flex-col w-2/3 space-y-4 justify-center">
							<div className="flex justify-center rounded-xl p-2 w-8/10 bg-emerald-400 ">
								UPCOMING MEETING
							</div>
							<div className="flex justify-center items-center  h-1/2 rounded-xl bg-white ">
								<div className="flex justify-center w-1/4">
									<img
										className="rounded-full"
										src={userState.profileImage || ""}
										alt="meeting pic"
										width={50}
										height={50}
									/>
								</div>
								<div className="flex flex-col justify-center  w-3/4">
									<div className="flex flex-col">
										<p className="text-md">Dean Ferrera</p>
										<p className="text-sm">Supplier</p>
									</div>
									<div className="flex justify-around">
										<p className="bg-gray-200 px-4 rounded-xl">3:00</p>
										<p className="bg-gray-200 px-4 rounded-xl">3:30</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="hidden w-1/3 h-full sm:flex">
						<Calendar />
					</div>
				</div>
				<div className="flex justify-center items-center h-1/2">items 2</div>
			</div>
		</div>
	);
};

export default UserDashboard;
