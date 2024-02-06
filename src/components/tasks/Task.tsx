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
				<div className="flex ">
					<ul className="flex items-center pt-2 flex-col w-full space-y-4">
						<li className="flex w-5/6 h-10 ">TODO</li>
						{todoList.map(todo => (
							<li
								key={todo.id}
								className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
							>
								<p className="pl-2 flex justify-center items-center">
									{todo.title}
								</p>
								<button
									onClick={() => handleMoveToProgress(todo.id)}
									className="p-2 bg-orange-400 rounded-sm"
								>
									To do
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className="flex ">
					<ul className="flex items-center pt-2 flex-col w-full space-y-4">
						<li className="flex w-5/6 h-10 ">In progress</li>

						{progressList.map(progress => (
							<li
								key={progress.id}
								className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
							>
								<p className="pl-2 flex justify-center items-center">
									{progress.title}
								</p>
								<button
									onClick={() => handleMoveToComplete(progress.id)}
									className="p-2 bg-blue-400 rounded-sm"
								>
									In progress
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className="flex">
					<ul className="flex items-center pt-2 flex-col w-full space-y-4">
						<li className="flex w-5/6 h-10 ">Complete</li>

						{completeList.map(complete => (
							<li
								key={complete.id}
								className="flex items-center justify-between w-5/6 h-10 border-[#30363E] bg-[#161B22] border rounded-md"
							>
								<p className="pl-2 flex justify-center items-center">
									{complete.title}
								</p>
								<button className="p-2 bg-blue-400 rounded-sm">Complete</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Task;
