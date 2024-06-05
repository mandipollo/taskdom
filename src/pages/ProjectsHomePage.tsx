import React, { useEffect, useState } from "react";

import ProjectHead from "../components/project/ProjectHead";

import ProjectLists from "../components/project/ProjectLists";
import { useAppSelector } from "../store/store";
import {
	Unsubscribe,
	collection,
	doc,
	onSnapshot,
	setDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import ProjectInput from "../components/project/ProjectInput";

import { v4 as uuid } from "uuid";

import { ProjectListProps } from "../components/utilities/userDataProps";

const ProjectsHomePage: React.FC = () => {
	const userData = useAppSelector(state => state.auth);

	//local states

	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());

	const [projectTitle, setProjectTitle] = useState<string>("");
	const [projectDescription, setProjectDescription] = useState<string>("");
	const [toggleForm, setToggleForm] = useState<boolean>(false);

	const [projectList, setProjectList] = useState<ProjectListProps>([]);

	// projects ref
	const projectRef = doc(db, `projects/${userData.uid}`);
	const projectCollectionRef = collection(projectRef, "projects");

	// inputs

	const handleProjectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProjectTitle(e.target.value);
	};
	const handleProjectDescription = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setProjectDescription(e.target.value);
	};

	const handleToggleForm = () => {
		setToggleForm(!toggleForm);
	};

	// listener for projects

	useEffect(() => {
		let unsubscribe: Unsubscribe | undefined;

		if (userData.uid) {
			const projectsRef = collection(
				doc(db, "projects", userData.uid),
				"projects"
			);
			unsubscribe = onSnapshot(projectsRef, snapshot => {
				setProjectList([]);
				snapshot.forEach(doc => {
					const data: any = doc.data();

					setProjectList(prev => [...prev, data]);
				});
			});
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [userData.uid]);

	// submit project
	const handleProjectSubmit = async (e: React.FormEvent) => {
		// project firebase ref

		e.preventDefault();
		if (projectTitle && projectDescription) {
			let idDocument = uuid();
			const newProject = {
				title: projectTitle,
				description: projectDescription,
				status: "Ongoing",
				id: idDocument,
				teamLeadPhoto: userData.photoURL ? userData.photoURL : null,
				teamLeadName: userData.displayName,
				startDate: startDate,
				endDate: endDate,
			};

			await setDoc(doc(projectCollectionRef, idDocument), newProject);

			setProjectTitle("");
			setProjectDescription("");
			handleToggleForm();
		}
	};

	// filter projects

	const [filterProjectStatus, setFilterProjectStatus] = useState<string>("");

	const handleFilterProjectStatus = (e: string) => {
		setFilterProjectStatus(e);
	};
	return (
		<div
			className="flex relative flex-col w-full p-4 overflow-auto"
			style={{ maxHeight: " calc( 100vh - 3.5rem )" }}
		>
			{toggleForm && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
					onClick={handleToggleForm}
				></div>
			)}

			{toggleForm && (
				<ProjectInput
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
					projectDescription={projectDescription}
					projectTitle={projectTitle}
					handleProjectDescription={handleProjectDescription}
					handleProjectTitle={handleProjectTitle}
					handleProjectSubmit={handleProjectSubmit}
					handleToggleForm={handleToggleForm}
				/>
			)}
			<ProjectHead
				filterProjectStatus={filterProjectStatus}
				handleToggleForm={handleToggleForm}
				handleFilterProjectStatus={handleFilterProjectStatus}
			/>

			{userData.uid && (
				<ProjectLists
					filterProjectStatus={filterProjectStatus}
					projectList={projectList}
					userUid={userData.uid}
				/>
			)}
		</div>
	);
};

export default ProjectsHomePage;
