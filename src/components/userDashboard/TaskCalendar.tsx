import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { TaskProps } from "../utilities/userDataProps";

const renderEventContent = (eventInfo: any) => {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	);
};

interface TaskCalendarProps {
	taskList: TaskProps[];
}
const TaskCalendar: React.FC<TaskCalendarProps> = ({ taskList }) => {
	const events = taskList
		.filter(task => task.status === "Ongoing")
		.map(task => {
			const date = task.targetDate.toDate();
			const formattedDate = date.toISOString().split("T")[0];

			return { id: task.id, title: task.title, start: formattedDate };
		});

	return (
		<FullCalendar
			eventContent={renderEventContent}
			plugins={[dayGridPlugin, timeGridPlugin]}
			initialView="dayGridMonth"
			events={events}
			headerToolbar={{
				left: "prev,next",
				center: "title",
				right: "timeGridWeek,dayGridMonth",
			}}
		/>
	);
};

export default TaskCalendar;
