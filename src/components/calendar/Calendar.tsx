import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
const Calendar = () => {
	return (
		<div className="flex ">
			<Fullcalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
				initialView={"dayGridMonth"}
				height={300}
				headerToolbar={{
					start: "title",
					center: "",
					end: "prev,next",
				}}
			/>
		</div>
	);
};

export default Calendar;
