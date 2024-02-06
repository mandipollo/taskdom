import React from "react";

type todoListsProps = {
	handleDrop: (e: React.DragEvent, targetList: string) => void;
	handleDragOver: (e: React.DragEvent) => void;
	todoList: { id: string; title: string }[];
	handleDragStart: (e: React.DragEvent, id: string, list: string) => void;
	handleMoveToProgress: (id: string) => void;
};
const TodoLists: React.FC<todoListsProps> = ({
	handleDrop,
	handleDragOver,
	todoList,
	handleDragStart,
	handleMoveToProgress,
}) => {
	return (
		<div
			className="flex "
			onDrop={e => handleDrop(e, "todoList")}
			onDragOver={handleDragOver}
		>
			<ul className="flex items-center pt-2 flex-col w-full space-y-4">
				<li className="flex w-5/6 h-10 ">TODO</li>
				{todoList.map(todo => (
					<li
						draggable
						onDragStart={e => handleDragStart(e, todo.id, "todoList")}
						key={todo.id}
						className=" flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
					>
						<p className="w-4/5 overflow-hidden pl-2 flex items-center text-ellipsis whitespace-nowrap">
							{todo.title}
						</p>
						<button
							onClick={() => handleMoveToProgress(todo.id)}
							className="p-2 h-full w-1/5 bg-orange-400 rounded-sm"
						></button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoLists;
