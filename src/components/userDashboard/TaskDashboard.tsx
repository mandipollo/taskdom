import React from "react";

type taskBoardProps = {
	taskList: { id: string; title: string; status: string }[];
};
const TaskDashboard: React.FC<taskBoardProps> = ({ taskList }) => {
	return (
		<section className=" max-h-full h-full pt-10 w-full ">
			<div className="flex justify-center items-center  py-2 px-4 border w-full dark:border-[#30363E] ">
				Tasks
			</div>

			<ul className="space-y-4 overflow-y-auto max-h-full h-full">
				{taskList
					.filter(task => task.status !== "complete")
					.map(task => (
						<li key={task.id} className="space-x-2 pt-2">
							<p
								className={`${
									task.status === "todo"
										? "border-orange-400"
										: "border-blue-400"
								}  flex p-2 w-full border bg-[#0D1117] overflow-hidden overflow-x-auto text-ellipsis whitespace-nowrap`}
							>
								{task.title}
							</p>
						</li>
					))}
			</ul>
		</section>
	);
};

export default TaskDashboard;
