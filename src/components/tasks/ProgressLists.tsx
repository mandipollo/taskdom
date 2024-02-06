import React from "react";

type progressListProps = {
	handleDragOver: (e: React.DragEvent) => void;
	handleDrop: (e: React.DragEvent, targetList: string) => void;
	progressList: { id: string; title: string }[];
	handleDragStart: (e: React.DragEvent, id: string, list: string) => void;
	handleMoveToComplete: (id: string) => void;
};

const ProgressLists: React.FC<progressListProps> = ({
	handleDragOver,
	handleDrop,
	progressList,
	handleDragStart,
	handleMoveToComplete,
}) => {
	return (
		<div
			className="flex "
			onDragOver={handleDragOver}
			onDrop={e => handleDrop(e, "progressList")}
		>
			<ul className="flex items-center pt-2 flex-col w-full space-y-4">
				<li className="flex w-5/6 h-10 ">In progress</li>

				{progressList.map(progress => (
					<li
						draggable
						onDragStart={e => handleDragStart(e, progress.id, "progressList")}
						key={progress.id}
						className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
					>
						<p className="pl-2 flex  items-center text-ellipsis whitespace-nowrap w-4/5 overflow-hidden">
							{progress.title}
						</p>
						<button
							onClick={() => handleMoveToComplete(progress.id)}
							className="p-2 bg-blue-400 rounded-sm w-1/5 h-full"
						></button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProgressLists;
