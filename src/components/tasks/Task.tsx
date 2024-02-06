import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import TodoLists from "./TodoLists";
import ProgressLists from "./ProgressLists";
import CompleteLists from "./CompleteLists";
import { useAppSelector } from "../../store/store";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { task } from "../utilities/userDataProps";
const Task = () => {
	const userId = useAppSelector(state => state.auth.uid);
	const taskCollectionRef = doc(db, `tasks/${userId}`);

	const [todo, setTodo] = useState<string>("");
	const [todoList, setTodoList] = useState<
		{ id: string; title: string; status: string }[]
	>([]);
	const [progressList, setProgressList] = useState<
		{ id: string; title: string; status: string }[]
	>([]);

	const [completeList, setCompleteList] = useState<
		{ id: string; title: string; status: string }[]
	>([]);

	const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodo(e.target.value);
	};

	// submit new todo
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (todo) {
			const newTodo = { id: uuid(), title: todo, status: "todo" };
			setTodoList(prev => [...prev, newTodo]);

			// task collection snapshot

			const taskCollectionSnapshot = await getDoc(taskCollectionRef);

			// check if collection exists

			if (!taskCollectionSnapshot.exists()) {
				// collection does not exists create it
				await setDoc(taskCollectionRef, {});
			}
			//create users task

			await updateDoc(taskCollectionRef, {
				tasks: arrayUnion({
					...newTodo,
				}),
			});
		}
		setTodo("");
	};

	// move todo to progressList and update the status in firebase for the task
	const handleMoveToProgress = async (id: string) => {
		const selectedTodo = todoList.find(todo => todo.id === id);

		if (selectedTodo) {
			const updatedTodo = { ...selectedTodo, status: "progress" };
			setProgressList(prev => [...prev, updatedTodo]);
			setTodoList(prev => prev.filter(todo => todo.id !== updatedTodo.id));
			// change the task status

			const documentData = (await getDoc(taskCollectionRef)).data();
			if (documentData && documentData.tasks) {
				//find the task to update its status
				const tasks = documentData.tasks.map((task: task) =>
					task.id === id ? { ...task, status: "progress" } : task
				);
				// overwrite the task array with updated task, note * not a ideal solution to scale because of overwriting cost * to be changed later
				await updateDoc(taskCollectionRef, {
					tasks,
				});
			}
		}
	};

	// move to complete and update the task status in firebase

	const handleMoveToComplete = async (id: string) => {
		const selectedProgress = progressList.find(progress => id === progress.id);

		if (selectedProgress) {
			const udpatedProgress = { ...selectedProgress, status: "complete" };
			setCompleteList(prev => [...prev, udpatedProgress]);
			setProgressList(prev =>
				prev.filter(progress => progress.id !== udpatedProgress.id)
			);

			const documentData = (await getDoc(taskCollectionRef)).data();

			if (documentData && documentData.tasks) {
				const tasks = await documentData.tasks.map((task: task) =>
					task.id === id ? { ...task, status: "completed" } : task
				);

				// overwrite the task array with updated tasks

				await updateDoc(taskCollectionRef, {
					tasks,
				});
			}
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

	const handleDrop = async (e: React.DragEvent, targetList: string) => {
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
						const updatedTodoTask = { ...task, status: "progress" };
						setProgressList(prev => [...prev, updatedTodoTask]);
						const documentData = (await getDoc(taskCollectionRef)).data();

						if (documentData && documentData.tasks) {
							const tasks = await documentData.tasks.map((t: task) =>
								task.id === task.id ? { ...t, status: "progress" } : t
							);
							// overwrite the task array with updated tasks
							await updateDoc(taskCollectionRef, {
								tasks,
							});
						}
						break;
					case "completeList":
						const updatedProgressTask = { ...task, status: "complete" };
						setCompleteList(prev => [...prev, updatedProgressTask]);
						const documentDataComplete = (
							await getDoc(taskCollectionRef)
						).data();

						if (documentDataComplete && documentDataComplete.tasks) {
							const tasks = await documentDataComplete.tasks.map((t: task) =>
								task.id === task.id ? { ...t, status: "complete" } : t
							);
							// overwrite the task array with updated tasks
							await updateDoc(taskCollectionRef, {
								tasks,
							});
						}
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
			<div className="grid sm:grid-cols-3 grid-cols-1 h-full  ">
				<TodoLists
					handleDragOver={handleDragOver}
					handleDragStart={handleDragStart}
					handleDrop={handleDrop}
					handleMoveToProgress={handleMoveToProgress}
					todoList={todoList}
				/>
				<ProgressLists
					progressList={progressList}
					handleDragOver={handleDragOver}
					handleDragStart={handleDragStart}
					handleDrop={handleDrop}
					handleMoveToComplete={handleMoveToComplete}
				/>
				<CompleteLists
					completeList={completeList}
					handleDragOver={handleDragOver}
					handleDrop={handleDrop}
				/>
			</div>
		</div>
	);
};

export default Task;
