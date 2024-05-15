import React from "react";

const Tasks: React.FC = () => {
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
			<div className="grid grid-cols-4">
				<div className=" border-[#30363E] bg-[#0D1117] w-40 h-40 "></div>
				<div className=" border-[#30363E] bg-[#0D1117] w-40 h-40"></div>
				<div className=" border-[#30363E] bg-[#0D1117] w-40 h-40"></div>
				<div className=" border-[#30363E] bg-[#0D1117] w-40 h-40"></div>
			</div>
		</div>
	);
};

export default Tasks;
