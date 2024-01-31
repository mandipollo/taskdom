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
		<div className="hidden justify-center items-center  w-1/3 h-full sm:flex p-2">
			<ul className="space-y-2 ">
				{dummyData.map(task => (
					<li key={task.id} className="space-x-2">
						<button className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
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
