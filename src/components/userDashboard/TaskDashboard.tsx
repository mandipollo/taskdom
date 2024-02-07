import React from "react";
import { Link } from "react-router-dom";

type taskBoardProps = {
	taskList: { id: string; title: string; status: string }[];
};
const TaskDashboard: React.FC<taskBoardProps> = ({ taskList }) => {
	return (
		<div className=" max-h-full h-full pt-10 w-full ">
			<Link to="/tasks">
				<button className="text-xl py-2 px-4 border w-full border-[#30363E] bg-[#0D1117]">
					Task for today
				</button>
			</Link>

			<ul className="space-y-4 overflow-y-auto max-h-full h-full">
				{taskList
					.filter(task => task.status !== "complete")
					.map(task => (
						<li key={task.id} className="space-x-2 pt-2">
							<p
								className={`${
									task.status === "todo"
										? "border-orange-400"
										: "borderblue-400"
								}  flex p-2 w-full border bg-[#0D1117]`}
							>
								{task.title}
							</p>
						</li>
					))}
			</ul>
		</div>
	);
};

export default TaskDashboard;
