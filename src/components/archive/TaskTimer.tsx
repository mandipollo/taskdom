import { DocumentData, Timestamp, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase.config";
import playImg from "../../assets/play.svg";
import pauseImg from "../../assets/pause.svg";

interface TaskTimerProps {
	task: {
		id: string;
		title: string;
		description: string;
		priority: string | null;
		targetDate: Timestamp;
		status: string;
		projectId: string;
		time: number;
		timerStatus: Boolean;
	};
	userUid: string;
}
const TaskTimer: React.FC<TaskTimerProps> = ({ task, userUid }) => {
	const { id, projectId, status, time, timerStatus } = task;
	const [isPlay, setIsPlay] = useState<Boolean>(false);

	const handleIsPlay = () => {
		setIsPlay(!isPlay);
	};

	const toggleStatus = async (task: DocumentData) => {
		if (task) {
			const ref = doc(
				db,
				`projects/${userUid}/projects/${projectId}/tasks/${id}`
			);

			if (!timerStatus) {
				await updateDoc(ref, {
					timerStatus: !timerStatus,
				});
			} else {
				await updateDoc(ref, {
					timerStatus: !timerStatus,
				});
			}
		}
	};
	return (
		<button
			onClick={handleIsPlay}
			className={`flex justify-center items-center rounded-full  hover:animate-pulse`}
		>
			{isPlay ? (
				<img
					src={playImg}
					alt="start timer"
					className="object-cover w-10 h-10"
				/>
			) : (
				<img
					src={pauseImg}
					alt="pause timer"
					className="object-cover w-10 h-10"
				/>
			)}
		</button>
	);
};

export default TaskTimer;
