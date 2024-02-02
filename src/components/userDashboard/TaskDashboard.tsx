const dummyData = [
	{
		id: "test1",
		task: "finish demo",
	},
	{
		id: "test2",
		task: "validate form submission",
	},
	{
		id: "test3",
		task: "unit testing form submission",
	},
];

const TaskDashboard = () => {
	return (
		<div className=" max-h-full h-full pt-10 ">
			<button className="text-xl py-2 px-4 border border-[#30363E] bg-[#0D1117]">
				Task for today
			</button>

			<ul className="space-y-2 overflow-y-auto max-h-full h-full">
				{dummyData.map(task => (
					<li key={task.id} className="space-x-2">
						<button className="inline-flex items-center space-x-2 px-4 py-2 rounded border-b border-[#30363E]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<span>{task.task}</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskDashboard;
