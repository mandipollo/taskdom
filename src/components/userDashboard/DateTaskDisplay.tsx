import React from "react";
type dateTaskProps = {
	date: string;
	day: string;
	time: string;
};
const DateTaskDisplay: React.FC<dateTaskProps> = ({ day, date, time }) => {
	return (
		<div className="w-1/3 hidden sm:flex">
			<div className="flex flex-col h-full w-full justify-center p-2 space-y-4  ">
				<div className="flex h-1/2 items-center">
					<p className=" text-2xl">
						{day}, {date}
					</p>
				</div>
				<div className="flex flex-col h-1/2">
					<p className=" text-2xl">{time}</p>
					<p className="text-sm">You have 13 task today.</p>
				</div>
			</div>
		</div>
	);
};

export default DateTaskDisplay;
