// import { onSnapshot, doc, DocumentSnapshot } from "firebase/firestore";
// import { db } from "../../firebase.config";
// import { useAppDispatch } from "../store/store";
// import { setUserFirestoreData } from "../store/userFirestoreData";
// import { UserDataProps } from "../components/utilities/userDataProps";
// import { useEffect } from "react";
// const userFirestoreUpdate = async (uid: string) => {
// 	const dispatch = useAppDispatch();

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			// Call userFirestoreUpdate when the component mounts
// 			const dataRef = doc(db, `users/${uid}`);
// 			const unsubscribe = onSnapshot(dataRef, (doc: DocumentSnapshot) => {
// 				if (doc.exists()) {
// 					const data = doc.data() as UserDataProps;
// 					dispatch(setUserFirestoreData(data));
// 				}
// 			});

// 			// Return a cleanup function to unsubscribe when the component unmounts
// 			return () => unsubscribe();
// 		};

// 		fetchData();
// 	}, [uid]);
// };

// export default userFirestoreUpdate;

// // need to refactor to be used in root component
