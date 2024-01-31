import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
const Calendar = () => {
	return (
		<div className="flex w-80 bg-white">
			<Fullcalendar
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
				initialView={"timeGridWeek"}
				height={300}
				aspectRatio={1.5}
				headerToolbar={{
					start: "title",
					center: "",
					end: "today",
				}}
			/>
		</div>
	);
};

export default Calendar;
