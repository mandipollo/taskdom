import React from "react";

import deleteImg from "../../assets/delete.svg";

type todoListsProps = {
	handleDrop: (e: React.DragEvent, targetList: string) => void;
	handleDragOver: (e: React.DragEvent) => void;
	handleDragStart: (e: React.DragEvent, id: string, list: string) => void;
	handleMoveToProgress: (id: string) => void;
	handleDelete: (id: string) => void;
	firebaseTodo: { id: string; title: string; status: string }[];
};
const TodoLists: React.FC<todoListsProps> = ({
	handleDrop,
	handleDragOver,
	handleDragStart,
	handleMoveToProgress,
	handleDelete,
	firebaseTodo,
}) => {
	return (
		<div
			className="flex "
			onDrop={e => handleDrop(e, "todoList")}
			onDragOver={handleDragOver}
		>
			<ul className="flex items-center pt-2 flex-col w-full space-y-4">
				<li className="flex w-5/6 h-10 ">TODO</li>
				{firebaseTodo
					.filter(todo => todo.status === "todo")
					.map(todo => (
						<li
							draggable
							onDragStart={e => handleDragStart(e, todo.id, "todoList")}
							key={todo.id}
							className=" flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
						>
							<button
								onClick={() => handleDelete(todo.id)}
								className="p-2 h-full w-1/5  rounded-sm"
							>
								<img src={deleteImg} alt="delete" width={20} height={20} />
							</button>
							<p className="w-4/5 overflow-hidden overflow-x-auto pl-2 flex items-center text-ellipsis whitespace-nowrap">
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
