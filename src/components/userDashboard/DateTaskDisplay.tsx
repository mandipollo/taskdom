import React from "react";

type dateTaskProps = {
	date: string;
	day: string;
	time: string;
	noTask: number;
};
const DateTaskDisplay: React.FC<dateTaskProps> = ({
	day,
	date,
	time,
	noTask,
}) => {
	return (
		<div className="w-1/3 hidden sm:flex pt-10">
			<div className="flex flex-col h-full w-full space-y-2 ">
				<p className=" text-2xl">
					{day}, {date}
				</p>

				<p className=" text-2xl">{time}</p>
				<p className="text-sm">
					You have <span className="text-green-400">{noTask} </span> tasks
					today.
				</p>
			</div>
		</div>
	);
};

export default DateTaskDisplay;
