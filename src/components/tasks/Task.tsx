import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const Task = () => {
	const [todo, setTodo] = useState<string>("");
	const [todoList, setTodoList] = useState<{ id: string; title: string }[]>([]);
	const [progressList, setProgressList] = useState<
		{ id: string; title: string }[]
	>([]);

	const [completeList, setCompleteList] = useState<
		{ id: string; title: string }[]
	>([]);

	const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodo(e.target.value);
	};

	// submit new todo
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (todo) {
			const newTodo = { id: uuid(), title: todo };
			setTodoList(prev => [...prev, newTodo]);
		}
		setTodo("");
	};

	// move todo to progressList
	const handleMoveToProgress = (id: string) => {
		const selectedTodo = todoList.find(todo => todo.id === id);

		if (selectedTodo) {
			setProgressList(prev => [...prev, selectedTodo]);
			setTodoList(prev => prev.filter(todo => todo.id !== selectedTodo.id));
		}
	};

	// move to complete

	const handleMoveToComplete = (id: string) => {
		const selectedProgress = progressList.find(progress => id === progress.id);

		if (selectedProgress) {
			setCompleteList(prev => [...prev, selectedProgress]);
			setProgressList(prev =>
				prev.filter(progress => progress.id !== selectedProgress.id)
			);
		}
	};

	// handle drag start

	const handleDragStart = (e: React.DragEvent, id: string, list: string) => {
		e.dataTransfer.setData("text/plain", id);
		e.dataTransfer.setData("list", list);
	};
	// handle drag over

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};
	// handle drop

	const handleDrop = (e: React.DragEvent, targetList: string) => {
		e.preventDefault();

		const taskId = e.dataTransfer.getData("text/plain");
		const sourceList = e.dataTransfer.getData("list");

		// move task to new list

		if (taskId && sourceList && targetList !== sourceList) {
			const task =
				sourceList === "todoList"
					? todoList.find(task => task.id === taskId)
					: sourceList === "progressList"
					? progressList.find(progress => progress.id === taskId)
					: completeList.find(complete => complete.id === taskId);

			if (task) {
				switch (targetList) {
					case "todoList":
						setTodoList(prev => [...prev, task]);
						break;

					case "progressList":
						setProgressList(prev => [...prev, task]);
						break;
					case "completeList":
						setCompleteList(prev => [...prev, task]);
						break;
					default:
						break;
				}
			}

			// remove task from the sourceList

			switch (sourceList) {
				case "todoList":
					setTodoList(prev => prev.filter(task => taskId !== task.id));
					break;
				case "progressList":
					setProgressList(prev => prev.filter(task => task.id !== taskId));
					break;
				default:
					break;
			}
		}
	};
	return (
		<div className="flex flex-col h-full w-full ">
			<div className="flex justify-center items-center h-20 ">
				<form onSubmit={handleSubmit} className="flex p-2 space-x-4">
					<input
						value={todo || ""}
						onChange={handleTask}
						className="p-2 rounded-sm placeholder-gray-400 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
						type="text"
						placeholder="Create task"
					/>
					<button className="p-2 bg-[#508D69] rounded-sm" type="submit">
						SUBMIT
					</button>
				</form>
			</div>
			<div className="grid grid-cols-3 h-full  ">
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
								<p className="w-3/4 overflow-hidden pl-2 flex items-center text-ellipsis whitespace-nowrap">
									{todo.title}
								</p>
								<button
									onClick={() => handleMoveToProgress(todo.id)}
									className="p-2 h-full w-1/4 bg-orange-400 rounded-sm"
								>
									To do
								</button>
							</li>
						))}
					</ul>
				</div>
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
								onDragStart={e =>
									handleDragStart(e, progress.id, "progressList")
								}
								key={progress.id}
								className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
							>
								<p className="pl-2 flex  items-center text-ellipsis whitespace-nowrap w-3/4 overflow-hidden">
									{progress.title}
								</p>
								<button
									onClick={() => handleMoveToComplete(progress.id)}
									className="p-2 bg-blue-400 rounded-sm w-1/4 h-full"
								>
									Progress
								</button>
							</li>
						))}
					</ul>
				</div>
				<div
					className="flex"
					onDragOver={handleDragOver}
					onDrop={e => handleDrop(e, "completeList")}
				>
					<ul className="flex items-center pt-2 flex-col w-full space-y-4">
						<li className="flex w-5/6 h-10 ">Complete</li>

						{completeList.map(complete => (
							<li
								key={complete.id}
								className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
							>
								<p className="pl-2 flex items-center text-ellipsis w-3/4 overflow-hidden">
									{complete.title}
								</p>
								<button className="p-2 bg-blue-400 rounded-sm w-1/4 h-full">
									Complete
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Task;
