import React, { useEffect, useState } from "react";

import ProjectHead from "../components/project/ProjectHead";
import ProjectLists from "../components/project/ProjectLists";
import { useAppSelector } from "../store/store";

import { db, functions } from "../../firebase.config";
import ProjectInput from "../components/project/ProjectInput";

import { ProjectProps } from "../components/utilities/userDataProps";
import { httpsCallable } from "firebase/functions";
import {
	CollectionReference,
	DocumentReference,
	collection,
	doc,
	onSnapshot,
} from "firebase/firestore";
import Loading from "../components/utilities/Loading";

const ProjectsHomePage: React.FC = () => {
	const userData = useAppSelector(state => state.userFirestoreData);

	// Local states

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());

	const [projectTitle, setProjectTitle] = useState<string>("");
	const [projectDescription, setProjectDescription] = useState<string>("");
	const [toggleForm, setToggleForm] = useState<boolean>(false);

	// Inputs
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
	//
	const [projectIdList, setProjectIdList] = useState<string[]>([]);
	const [projectList, setProjectList] = useState<ProjectProps[]>([]);
	// setup listener for users project list

	useEffect(() => {
		if (!userData.uid) return;

		const usersProjectRef: CollectionReference = collection(
			db,
			`users/${userData.uid}/userProjects`
		);
		setIsLoading(true);
		const unsubscribe = onSnapshot(usersProjectRef, snapshot => {
			const tempProjectIdList: string[] = [];
			snapshot.forEach(doc => {
				tempProjectIdList.push(doc.id);
			});
			setProjectIdList(tempProjectIdList);
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, [userData.uid]);

	// setup listener for each projects

	const fetchProjectData = (projectIdList: string[]) => {
		const unsubscribes: (() => void)[] = [];

		projectIdList.forEach(projectId => {
			const ref: DocumentReference = doc(db, `projects`, projectId);
			const unsubscribe = onSnapshot(ref, docSnapShot => {
				if (docSnapShot.exists()) {
					const data = docSnapShot.data() as ProjectProps;

					setProjectList(prevProjectList => {
						const existingProjectIndex = prevProjectList.findIndex(
							project => project.id === projectId
						);
						if (existingProjectIndex !== -1) {
							const updatedProjectList = [...prevProjectList];
							updatedProjectList[existingProjectIndex] = data;
							return updatedProjectList;
						} else {
							return [...prevProjectList, data];
						}
					});
				} else {
					// Project does not exist, remove it from the list
					setProjectList(prevProjectList =>
						prevProjectList.filter(project => project.id !== projectId)
					);
				}
			});

			unsubscribes.push(unsubscribe);
		});

		// Return a function to unsubscribe from all listeners when component unmounts or dependencies change
		return () => {
			unsubscribes.forEach(unsubscribe => unsubscribe());
		};
	};

	useEffect(() => {
		if (!projectIdList) return;
		const unsubscribe = fetchProjectData(projectIdList);

		// Cleanup on unmount or when projectIdList changes
		return () => {
			unsubscribe();
		};
	}, [projectIdList]);

	// Submit project
	const handleProjectSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const submitProject = httpsCallable(functions, "submitProject");
		try {
			await submitProject({
				projectTitle,
				projectDescription,
				status: "Ongoing",
				adminPhoto: userData.profileImage ? userData.profileImage : null,
				adminName: userData.displayName,
				startDate,
				endDate,
				adminUid: userData.uid,
			});
			setProjectTitle("");
			setProjectDescription("");
			handleToggleForm();
		} catch (error) {
			console.error(error);
		}
	};

	// Filter projects
	const [filterProjectStatus, setFilterProjectStatus] = useState<string>("");

	const handleFilterProjectStatus = (e: string) => {
		setFilterProjectStatus(e);
	};

	return (
		<div className="flex relative flex-col w-full  overflow-auto">
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

			{isLoading ? (
				<Loading />
			) : (
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
