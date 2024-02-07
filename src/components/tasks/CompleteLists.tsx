import React from "react";

type completeListProps = {
	handleDrop: (e: React.DragEvent, list: string) => void;
	handleDragOver: (e: React.DragEvent) => void;
	firebaseTodo: { id: string; title: string; status: string }[];
};
const CompleteLists: React.FC<completeListProps> = ({
	handleDrop,
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
							<p className="pl-2 flex items-center text-ellipsis w-4/5 overflow-hidden">
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
