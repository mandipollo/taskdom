// import { doc, updateDoc } from "firebase/firestore";
// import { db, auth } from "../../firebase.config";

// type updateProps = {
// 	displayName: string | null;
// 	jobTitle: string | null;
// 	contactNo: string | null;
// 	workHours: string | null;
// };
// const updateUserInfo = async ({
// 	displayName,
// 	jobTitle,
// 	contactNo,
// 	workHours,
// }: updateProps) => {
// 	const uid = auth.currentUser?.uid;
// 	const userFirestoreRef = doc(db, `users/${uid}`);

// 	// create an object with non-null values

// 	const updatedData: Partial<updateProps> = {
// 		displayName,
// 		jobTitle,
// 		contactNo,
// 		workHours,
// 	};

// 	// filter out null values

// 	const filteredData = Object.fromEntries(
// 		Object.entries(updatedData).filter(([_, value]) => value !== null)
// 	);

// 	console.log(filteredData);

// 	// update the user firestore with non-null values

// 	if (Object.keys(filteredData).length > 0) {
// 		await updateDoc(userFirestoreRef, filteredData);
// 	}
// };

// export default updateUserInfo;
