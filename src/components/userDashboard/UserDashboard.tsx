import { useState, useEffect } from "react";

import { useAppSelector } from "../../store/store";
import DateTaskDisplay from "./DateTaskDisplay";
import UpcomingMeetingDisplay from "./UpcomingMeetingDisplay";
import TaskDashboard from "./TaskDashboard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { TaskProps } from "../utilities/userDataProps";

const UserDashboard: React.FC = () => {
	const userState = useAppSelector(state => state.userFirestoreData);
	const [taskList, setTaskList] = useState<
		{ id: string; title: string; status: string }[]
	>([]);

	const [noTask, setNoTask] = useState<number>(0);

	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000); // Update every second

		return () => clearInterval(intervalId); // Cleanup on component unmount
	}, []);

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

	useEffect(() => {
		const fetchTask = async () => {
			if (userState.uid) {
				const taskRef = doc(db, `tasks/${userState.uid}`);
				const data = (await getDoc(taskRef)).data();
				if (data && data.tasks) {
					const todayTasks = data.tasks.filter(
						(task: TaskProps) => task.status !== "complete"
					);

					setTaskList(todayTasks);
					const length = todayTasks.length;
					setNoTask(length);
				}
			}
		};

		fetchTask();
	}, []);
	return (
		<div className="flex flex-col w-full  h-full  bg-[#000408] text-[#E6EDF3]">
			<div className="flex justify-center items-center h-1/2 max-h-80  ">
				<div className="flex sm:w-2/3 w-full justify-center p-2 h-full">
					<DateTaskDisplay date={date} day={day} time={time} noTask={noTask} />
					<UpcomingMeetingDisplay profileImage={userState.profileImage} />
				</div>
				<div className=" hidden justify-center items-center  w-1/3 h-full max-h-full sm:flex p-2">
					<TaskDashboard taskList={taskList} />
				</div>
			</div>
			<div className="flex justify-center items-center flex-1 bg-[#0D1117] border-[#30363E] border ">
				<p>progress</p>
			</div>
		</div>
	);
};

export default UserDashboard;
