import React from "react";
import deleteImg from "../../assets/delete.svg";

type completeListProps = {
	handleDrop: (e: React.DragEvent, list: string) => void;
	handleDragOver: (e: React.DragEvent) => void;
	handleDelete: (id: string) => void;
	firebaseTodo: { id: string; title: string; status: string }[];
};
const CompleteLists: React.FC<completeListProps> = ({
	handleDrop,
	handleDelete,
	handleDragOver,
	firebaseTodo,
}) => {
	return (
		<div
			className="flex"
			onDragOver={handleDragOver}
			onDrop={e => handleDrop(e, "completeList")}
		>
			<ul className="flex items-center pt-2 flex-col w-full space-y-4">
				<li className="flex w-5/6 h-10 ">Complete</li>

				{firebaseTodo
					.filter(todo => todo.status === "complete")
					.map(todo => (
						<li
							key={todo.id}
							className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
						>
							<button
								onClick={() => handleDelete(todo.id)}
								className="p-2 h-full w-1/5  rounded-sm"
							>
								<img src={deleteImg} alt="delete" width={20} height={20} />
							</button>
							<p className="pl-2 overflow-x-auto flex items-center text-ellipsis w-4/5 overflow-hidden">
								{todo.title}
							</p>
							<button className="p-2 bg-[#508D69] rounded-sm w-1/5 h-full"></button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default CompleteLists;
