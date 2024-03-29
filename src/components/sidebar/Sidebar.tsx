import React, { useEffect, useState } from "react";
import dashboard from "../../assets/dashboard.svg";
import project from "../../assets/project.svg";
import task from "../../assets/task.svg";
import dropdown from "../../assets/dropdown.svg";
import teams from "../../assets/teams.svg";
import chat from "../../assets/chat.svg";
import setting from "../../assets/setting.svg";
import logout from "../../assets/logout.svg";
import add from "../../assets/add.svg";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import signOutUser from "../../firebaseAuth/signOutUser";
import { resetUserFirestoreData } from "../../store/userFirestoreData";
import ProjectInput from "./ProjectInput";
import { v4 as uuid } from "uuid";

import { db } from "../../../firebase.config";
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	Unsubscribe,
	onSnapshot,
	DocumentData,
} from "firebase/firestore";

const Sidebar: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const classBtn = "flex flex-row space-x-2 hover:underline ";

	const userId = useAppSelector(state => state.auth.uid);
	const projectCollectionRef = doc(db, `projects/${userId}`);

	const [projectList, setProjectList] = useState<
		{
			id: string;
			status: string;
			description: string;
			title: string;
		}[]
	>([]);

	const [projectTitle, setProjectTitle] = useState<string>("");
	const [projectDescription, setProjectDescription] = useState<string>("");
	const [showProject, setShowProject] = useState<boolean>(false);
	const [toggleForm, setToggleForm] = useState<boolean>(false);

	const handleAddProject = () => {
		setShowProject(!showProject);
	};

	const handleToggleForm = () => {
		setToggleForm(!toggleForm);
	};

	const handleProjectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProjectTitle(e.target.value);
	};
	const handleProjectDescription = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setProjectDescription(e.target.value);
	};

	// submit project
	const handleProjectSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (projectTitle && projectDescription) {
			const newProject = {
				title: projectTitle,
				description: projectDescription,
				status: "new",
				id: uuid(),
			};

			// task collection snapshot

			const projectCollectionSnapshot = await getDoc(projectCollectionRef);

			// check if collection exists

			if (!projectCollectionSnapshot.exists()) {
				// collection does not exists create it
				await setDoc(projectCollectionRef, {});
			}
			//create users task and spread the newTodo in a array of object

			await updateDoc(projectCollectionRef, {
				projects: arrayUnion({ ...newProject }),
			});

			setProjectTitle("");
			setProjectDescription("");
			handleToggleForm();
		}
	};

	// sign out
	const signOutHandler = () => {
		dispatch(resetUserFirestoreData());
		signOutUser();
		navigate("/");
	};

	// setup a listener for project update

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined;

		if (userId) {
			const docRef = doc(db, `projects/${userId}`);
			unsubscribe = onSnapshot(docRef, (doc: DocumentData) => {
				if (doc.exists()) {
					const data = doc.data().projects;
					setProjectList(data);
				}
			});
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [userId]);
	return (
		<div className="flex flex-col w-full items-center border border-[#30363E] bg-[#0D1117] ">
			{toggleForm && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
					onClick={handleToggleForm}
				></div>
			)}
			{toggleForm && (
				<ProjectInput
					projectDescription={projectDescription}
					projectTitle={projectTitle}
					handleProjectDescription={handleProjectDescription}
					handleProjectTitle={handleProjectTitle}
					handleProjectSubmit={handleProjectSubmit}
					handleToggleForm={handleToggleForm}
				/>
			)}

			<ul className="flex flex-col space-y-6 md:pt-20 pt-10">
				<li>
					<Link to="userDashboard">
						<button className={classBtn}>
							<img src={dashboard} width={20} height={20} alt="dashboard" />
							<p className=" sm:block hidden">Dashboard</p>
						</button>
					</Link>
				</li>
				<li className="space-y-2">
					<button onClick={handleAddProject} className={classBtn}>
						<img src={project} width={20} height={20} alt="projects" />
						<p className=" sm:block hidden">Projects</p>
						<img src={dropdown} alt="drop" width={20} height={20} />
					</button>
					{showProject && (
						<ul className="space-y-4 translate-x-2">
							<li key={1}>
								<button onClick={handleToggleForm} className="flex flex-row">
									<img src={add} width={20} height={20} alt="projects" />
								</button>
							</li>
							{projectList &&
								projectList.map(project => (
									<li key={project.id}>
										<Link
											key={project.id}
											to={`/projects/${project.id}`}
											state={project}
										>
											<button className="flex flex-row space-x-2 ">
												<p className=" sm:block hidden text-[#508D69]">
													{project.title}
												</p>
											</button>
										</Link>
									</li>
								))}
						</ul>
					)}
				</li>

				<li>
					<Link to="tasks">
						<button className={classBtn}>
							<img src={task} width={20} height={20} alt="task" />
							<p className=" sm:block hidden">Task</p>
						</button>
					</Link>
				</li>
				<li>
					<Link to="/teams">
						<button className={classBtn}>
							<img src={teams} width={20} height={20} alt="clients" />
							<p className=" sm:block hidden">Teams</p>
						</button>
					</Link>
				</li>
				<li>
					<Link to="/chats">
						<button className={classBtn}>
							<img src={chat} width={20} height={20} alt="chat" />
							<p className=" sm:block hidden"> Chat</p>
						</button>
					</Link>
				</li>

				<li>
					<Link to="/accountSetting">
						<button className={classBtn}>
							<img src={setting} width={20} height={20} alt="setting" />
							<p className=" sm:block hidden">Settings</p>
						</button>
					</Link>
				</li>
				<li>
					<button onClick={signOutHandler} className={classBtn}>
						<img src={logout} width={20} height={20} alt="setting" />
						<p className=" sm:block hidden">Sign out</p>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
