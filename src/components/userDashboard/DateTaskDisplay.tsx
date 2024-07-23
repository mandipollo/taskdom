import React from "react";

type dateTaskProps = {
	date: string;
	day: string;
	time: string;
	noTask: number;
};

// const [currentDateTime, setCurrentDateTime] = useState(new Date());

// useEffect(() => {
// 	const intervalId = setInterval(() => {
// 		setCurrentDateTime(new Date());
// 	}, 1000); // Update every second

// 	return () => clearInterval(intervalId); // Cleanup on component unmount
// }, []);

// const day = currentDateTime.toLocaleString("en-UK", { weekday: "long" });
// const date = currentDateTime.toLocaleString("en-UK", {
// 	day: "numeric",
// });
// const time = currentDateTime.toLocaleString("en-UK", {
// 	hour: "numeric",
// 	minute: "numeric",
// 	second: "numeric",
// 	hour12: true, // Use 12-hour clock format
// });
const DateTaskDisplay: React.FC<dateTaskProps> = ({
	day,
	date,
	time,
	noTask,
}) => {
	return (
		<section className="w-1/3 hidden sm:flex pt-10">
			<div className="flex flex-col h-full w-full space-y-2 ">
				<p aria-label="day and date" className=" text-2xl">
					{day}, {date}
				</p>

				<p aria-label="time" className=" text-2xl">
					{time}
				</p>
				<p aria-label="Number of tasks " className="text-sm">
					You have <span className="text-green-400">{noTask} </span> tasks
					today.
				</p>
			</div>
		</section>
	);
};

export default DateTaskDisplay;
