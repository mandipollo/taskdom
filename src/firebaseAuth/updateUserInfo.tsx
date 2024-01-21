import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.config";

type updateProps = {
	displayName: string;
	jobTitle: string;
	contactNo: number;
};
const updateUserInfo = async ({
	displayName,
	jobTitle,
	contactNo,
}: updateProps) => {
	const uid = auth.currentUser?.uid;
	const userFirestoreRef = doc(db, `users/${uid}`);

	// Set the "capital" field of the city 'DC'
	await updateDoc(userFirestoreRef, {
		displayName: displayName,
		jobTitle: jobTitle,
		contactNo: contactNo,
	});
};

export default updateUserInfo;
