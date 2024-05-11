// import add from "../../assets/add.svg";
// import dropdown from "../../assets/dropdown.svg";

// import ProjectInput from "./ProjectInput";
// import { v4 as uuid } from "uuid";

// import { db } from "../../../firebase.config";
// import {
// 	doc,
// 	getDoc,
// 	setDoc,
// 	updateDoc,
// 	arrayUnion,
// 	Unsubscribe,
// 	onSnapshot,
// 	DocumentData,
// } from "firebase/firestore";

// button add
{
	/* <li key={1}>
								<button onClick={handleToggleForm} className="flex flex-row">
									<img src={add} width={20} height={20} alt="projects" />
								</button>
							</li> */
}

// const projectCollectionRef = doc(db, `projects/${userId}`);

// const [projectList, setProjectList] = useState<
// 	{
// 		id: string;
// 		status: string;
// 		description: string;
// 		title: string;
// 	}[]
// >([]);
// const [projectTitle, setProjectTitle] = useState<string>("");
// const [projectDescription, setProjectDescription] = useState<string>("");
// const [showProject, setShowProject] = useState<boolean>(false);
// const [toggleForm, setToggleForm] = useState<boolean>(false);
// toggle projects

// const handleProjectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
// 	setProjectTitle(e.target.value);
// };
// const handleProjectDescription = (
// 	e: React.ChangeEvent<HTMLTextAreaElement>
// ) => {
// 	setProjectDescription(e.target.value);
// };

// {
// 	toggleForm && (
// 		<ProjectInput
// 			projectDescription={projectDescription}
// 			projectTitle={projectTitle}
// 			handleProjectDescription={handleProjectDescription}
// 			handleProjectTitle={handleProjectTitle}
// 			handleProjectSubmit={handleProjectSubmit}
// 			handleToggleForm={handleToggleForm}
// 		/>
// 	);
// }
// {
// 	showProject && (
// 		<ul className="space-y-4 translate-x-2">
// 			{projectList &&
// 				projectList.map(project => (
// 					<li key={project.id}>
// 						<Link
// 							key={project.id}
// 							to={`/projects/${project.id}`}
// 							state={project}
// 						>
// 							<button className="flex flex-row space-x-2 ">
// 								<p className=" sm:block hidden text-[#508D69]">
// 									{project.title}
// 								</p>
// 							</button>
// 						</Link>
// 					</li>
// 				))}
// 		</ul>
// 	);
// }

// listener for projects

// useEffect(() => {
// 	let unsubscribe: Unsubscribe | undefined;

// 	if (userId) {
// 		const docRef = doc(db, `projects/${userId}`);
// 		unsubscribe = onSnapshot(docRef, (doc: DocumentData) => {
// 			if (doc.exists()) {
// 				const data = doc.data().projects;
// 				setProjectList(data);
// 			}
// 		});
// 	}

// 	return () => {
// 		if (unsubscribe) {
// 			unsubscribe();
// 		}
// 	};
// }, [userId]);

// submit project
// const handleProjectSubmit = async (e: React.FormEvent) => {
// 	e.preventDefault();
// 	if (projectTitle && projectDescription) {
// 		const newProject = {
// 			title: projectTitle,
// 			description: projectDescription,
// 			status: "new",
// 			id: uuid(),
// 		};

// 		// task collection snapshot

// 		const projectCollectionSnapshot = await getDoc(projectCollectionRef);

// 		// check if collection exists

// 		if (!projectCollectionSnapshot.exists()) {
// 			// collection does not exists create it
// 			await setDoc(projectCollectionRef, {});
// 		}
// 		//create users task and spread the newTodo in a array of object

// 		await updateDoc(projectCollectionRef, {
// 			projects: arrayUnion({ ...newProject }),
// 		});

// 		setProjectTitle("");
// 		setProjectDescription("");
// 		handleToggleForm();
// 	}
// };

// const handleAddProject = () => {
// 	setShowProject(!showProject);
// };

// const handleToggleForm = () => {
// 	setToggleForm(!toggleForm);
// };

// overlay

// {
// 	toggleForm && (
// 		<div
// 			className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
// 			onClick={handleToggleForm}
// 		></div>
// 	);
// }
