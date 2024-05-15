import React from "react";
import deleteImg from "../../assets/delete.svg";

type progressListProps = {
	handleDragOver: (e: React.DragEvent) => void;
	handleDrop: (e: React.DragEvent, targetList: string) => void;
	handleDragStart: (e: React.DragEvent, id: string, list: string) => void;
	handleMoveToComplete: (id: string) => void;
	handleDelete: (id: string) => void;
	firebaseTodo: { id: string; title: string; status: string }[];
};

const ProgressLists: React.FC<progressListProps> = ({
	handleDelete,
	handleDragOver,
	handleDrop,
	handleDragStart,
	handleMoveToComplete,
	firebaseTodo,
}) => {
	return (
		<div
			className="flex "
			onDragOver={handleDragOver}
			onDrop={e => handleDrop(e, "progressList")}
		>
			<ul className="flex items-center pt-2 flex-col w-full space-y-4">
				<li className="flex w-5/6 h-10 ">In progress</li>

				{firebaseTodo
					.filter(todo => todo.status === "progress")
					.map(todo => (
						<li
							draggable
							onDragStart={e => handleDragStart(e, todo.id, "progressList")}
							key={todo.id}
							className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
						>
							<button
								onClick={() => handleDelete(todo.id)}
								className="p-2 h-full w-1/5  rounded-sm"
							>
								<img src={deleteImg} alt="delete" width={20} height={20} />
							</button>
							<p className="pl-2 flex overflow-x-auto items-center text-ellipsis whitespace-nowrap w-4/5 overflow-hidden">
								{todo.title}
							</p>
							<button
								onClick={() => handleMoveToComplete(todo.id)}
								className="p-2 bg-blue-400 rounded-sm w-1/5 h-full"
							></button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default ProgressLists;
