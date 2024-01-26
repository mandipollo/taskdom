import { onSnapshot, doc, DocumentSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAppDispatch } from "../store/store";
import { setUserFirestoreData } from "../store/userFirestoreData";
import { userDataProps } from "../components/utilities/userDataProps";

const userFirestoreUpdate = async (uid: string) => {
	const dataRef = doc(db, `users/${uid}`);

	const dispatch = useAppDispatch();
	const unsubscribe = onSnapshot(dataRef, (doc: DocumentSnapshot) => {
		if (doc.exists()) {
			const data = doc.data() as userDataProps;
			dispatch(setUserFirestoreData(data));
		}
	});

	return unsubscribe;
};

export default userFirestoreUpdate;
