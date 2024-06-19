// import React, { useEffect, useState } from "react";
// import { v4 as uuid } from "uuid";
// import TodoLists from "../components/archive/TodoLists";
// import ProgressLists from "../components/archive/personalTask/ProgressLists";
// import CompleteLists from "../components/archive/personalTask/CompleteLists";
// import { useAppSelector } from "../store/store";
// import {
// 	DocumentData,
// 	Unsubscribe,
// 	arrayUnion,
// 	doc,
// 	getDoc,
// 	onSnapshot,
// 	setDoc,
// 	updateDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase.config";
// import { TaskProps } from "../components/utilities/userDataProps";
// const TaskPage = () => {
// 	const userId = useAppSelector(state => state.auth.uid);
// 	const taskCollectionRef = doc(db, `tasks/${userId}`);

// 	// input state
// 	const [todo, setTodo] = useState<string>("");

// 	// firebase task state
// 	const [firebaseTodo, setFirebaseTodo] = useState<
// 		{ id: string; title: string; status: string }[]
// 	>([]);

// 	const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setTodo(e.target.value);
// 	};

// 	// submit new todo
// 	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		if (todo) {
// 			const newTodo = { id: uuid(), title: todo, status: "todo" };

// 			// task collection snapshot

// 			const taskCollectionSnapshot = await getDoc(taskCollectionRef);

// 			// check if collection exists

// 			if (!taskCollectionSnapshot.exists()) {
// 				// collection does not exists create it
// 				await setDoc(taskCollectionRef, {});
// 			}
// 			//create users task and spread the newTodo in a array of object

// 			await updateDoc(taskCollectionRef, {
// 				tasks: arrayUnion({
// 					...newTodo,
// 				}),
// 			});
// 		}
// 		setTodo("");
// 	};

// 	// move todo to progressList and update the status in firebase for the task
// 	const handleMoveToProgress = async (id: string) => {
// 		const selectedTodo = firebaseTodo.find(todo => todo.id === id);

// 		if (selectedTodo) {
// 			if (firebaseTodo) {
// 				//find the task to update its status
// 				const tasks = firebaseTodo.map((task: TaskProps) =>
// 					task.id === id ? { ...task, status: "progress" } : task
// 				);
// 				// overwrite the task array with updated task, note * not a ideal solution to scale because of overwriting cost * to be changed later
// 				await updateDoc(taskCollectionRef, {
// 					tasks,
// 				});
// 			}
// 		}
// 	};

// 	// move to complete and update the task status in firebase

// 	const handleMoveToComplete = async (id: string) => {
// 		const selectedProgress = firebaseTodo.find(todo => id === todo.id);
// 		if (selectedProgress) {
// 			if (firebaseTodo) {
// 				const tasks = firebaseTodo.map((task: TaskProps) =>
// 					task.id === id ? { ...task, status: "complete" } : task
// 				);

// 				// overwrite the task array with updated tasks

// 				await updateDoc(taskCollectionRef, {
// 					tasks,
// 				});
// 			}
// 		}
// 	};

// 	// handle drag start

// 	const handleDragStart = (e: React.DragEvent, id: string, list: string) => {
// 		e.dataTransfer.setData("text/plain", id);
// 		e.dataTransfer.setData("list", list);
// 	};
// 	// handle drag over

// 	const handleDragOver = (e: React.DragEvent) => {
// 		e.preventDefault();
// 	};
// 	// handle drop

// 	const handleDrop = async (e: React.DragEvent, targetList: string) => {
// 		e.preventDefault();

// 		const taskId = e.dataTransfer.getData("text/plain");
// 		const sourceList = e.dataTransfer.getData("list");

// 		// move task to new list

// 		if (taskId && sourceList && targetList !== sourceList) {
// 			const task =
// 				sourceList === "todoList"
// 					? firebaseTodo.find(task => task.id === taskId)
// 					: sourceList === "progressList"
// 					? firebaseTodo.find(progress => progress.id === taskId)
// 					: firebaseTodo.find(complete => complete.id === taskId);

// 			if (task) {
// 				switch (targetList) {
// 					case "progressList":
// 						if (firebaseTodo) {
// 							const tasks = firebaseTodo.map((t: TaskProps) =>
// 								task.id === t.id ? { ...t, status: "progress" } : t
// 							);
// 							// overwrite the task array with updated tasks
// 							await updateDoc(taskCollectionRef, {
// 								tasks,
// 							});
// 						}
// 						break;
// 					case "completeList":
// 						if (firebaseTodo) {
// 							const tasks = firebaseTodo.map((t: TaskProps) =>
// 								task.id === t.id ? { ...t, status: "complete" } : t
// 							);
// 							// overwrite the task array with updated tasks
// 							await updateDoc(taskCollectionRef, {
// 								tasks,
// 							});
// 						}
// 						break;
// 					default:
// 						break;
// 				}
// 			}
// 		}
// 	};

// 	// handle delete

// 	const handleDelete = async (id: string) => {
// 		const selectedTask = firebaseTodo.find(todo => id === todo.id);
// 		if (selectedTask) {
// 			if (firebaseTodo) {
// 				const tasks = firebaseTodo.filter((task: TaskProps) => task.id !== id);

// 				// overwrite the task array with updated tasks

// 				await updateDoc(taskCollectionRef, {
// 					tasks,
// 				});
// 			}
// 		}
// 	};

// 	// listener for task update , cleanup on exit

// 	useEffect(() => {
// 		let unsubscribe: Unsubscribe | undefined;

// 		if (userId) {
// 			const docRef = doc(db, `tasks/${userId}`);
// 			unsubscribe = onSnapshot(docRef, (doc: DocumentData) => {
// 				if (doc.exists()) {
// 					const data = doc.data().tasks;
// 					setFirebaseTodo(data);
// 				}
// 			});
// 		}

// 		return () => {
// 			if (unsubscribe) {
// 				unsubscribe();
// 			}
// 		};
// 	}, [userId]);
// 	return (
// 		<div className="flex flex-col h-full w-full ">
// 			<div className="flex justify-center items-center h-20 ">
// 				<form onSubmit={handleSubmit} className="flex p-2 space-x-4">
// 					<input
// 						value={todo || ""}
// 						onChange={handleTask}
// 						className="p-2 rounded-sm placeholder-gray-400 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] text-[#E6EDF3] "
// 						type="text"
// 						placeholder="Create task"
// 					/>
// 					<button className="p-2 bg-[#508D69] rounded-sm" type="submit">
// 						SUBMIT
// 					</button>
// 				</form>
// 			</div>
// 			<div className="grid sm:grid-cols-3 grid-cols-1 h-full  ">
// 				<TodoLists
// 					handleDelete={handleDelete}
// 					firebaseTodo={firebaseTodo}
// 					handleDragOver={handleDragOver}
// 					handleDragStart={handleDragStart}
// 					handleDrop={handleDrop}
// 					handleMoveToProgress={handleMoveToProgress}
// 				/>
// 				<ProgressLists
// 					handleDelete={handleDelete}
// 					firebaseTodo={firebaseTodo}
// 					handleDragOver={handleDragOver}
// 					handleDragStart={handleDragStart}
// 					handleDrop={handleDrop}
// 					handleMoveToComplete={handleMoveToComplete}
// 				/>
// 				<CompleteLists
// 					handleDelete={handleDelete}
// 					firebaseTodo={firebaseTodo}
// 					handleDragOver={handleDragOver}
// 					handleDrop={handleDrop}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default TaskPage;
