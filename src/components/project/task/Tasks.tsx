import { Timestamp } from "firebase/firestore";
import React from "react";

type TaskListProps = {
	taskList: {
		title: string;
		id: string;
		description: string;
		targetDate: Timestamp;
		status: string;
		priority: string;
	}[];
};

const Tasks: React.FC<TaskListProps> = ({ taskList }) => {
	const activeClass = `text-white `;
	const liClass = `text-gray-400`;

	return (
		<div className="flex flex-col flex-1 w-full space-y-2">
			<div className="flex w-full">
				<ul className="flex flex-row w-full  space-x-4">
					<li className={activeClass}>
						<button className="underline underline-offset-4">
							All Projects
						</button>
					</li>
					<li className={liClass}>
						<button>On Going</button>
					</li>
					<li className={liClass}>
						<button>Completed</button>
					</li>
					<li className={liClass}>
						<button>Upcoming</button>
					</li>
				</ul>
			</div>
			<ul className="grid grid-cols-4 gap-2 auto-rows-auto">
				{taskList.map(task => (
					<li key={task.id} className=" space-y-2 bg-[#161B22] rounded-md p-2">
						<p className="text-lg">{task.title}</p>
						<p className="text-gray-400">{task.description}</p>
						<p className="bg-red-800 rounded-xl text-sm w-fit px-2">
							{task.priority}
						</p>
						<p className="text-gray-400">
							{task.targetDate.toDate().toLocaleDateString()}
						</p>
						<div className="flex flex-row">
							<span className=" flex  justify-center items-center text-center rounded-full bg-gray-300 h-8 w-8 p-2 text-black">
								A
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Tasks;
