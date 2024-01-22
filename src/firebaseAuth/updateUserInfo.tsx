import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.config";

type updateProps = {
	displayName: string | null;
	jobTitle: string | null;
	contactNo: string | null;
	workHours: string | null;
};
const updateUserInfo = async ({
	displayName,
	jobTitle,
	contactNo,
	workHours,
}: updateProps) => {
	const uid = auth.currentUser?.uid;
	const userFirestoreRef = doc(db, `users/${uid}`);

	// update the user firestore
	await updateDoc(userFirestoreRef, {
		displayName: displayName,
		jobTitle: jobTitle,
		contactNo: contactNo,
		workHours: workHours,
	});
};

export default updateUserInfo;
