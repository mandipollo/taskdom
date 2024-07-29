const UpcomingMeetingDisplay = () => {
	return (
		<section className="flex flex-col w-full md:w-1/2 h-full space-y-2">
			<div className="flex text-white justify-center rounded-xl p-2  bg-primaryGreen ">
				UPCOMING MEETING
			</div>
			<div className="flex justify-center items-center h-full rounded-xl border dark:border-darkBorder dark:bg-darkSecondary bg-lightPrimary shadow-md ">
				<p>Meeting feature coming soon</p>
			</div>
		</section>
	);
};

export default UpcomingMeetingDisplay;
