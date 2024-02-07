import { onSnapshot, doc, DocumentSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAppDispatch } from "../store/store";
import { setUserFirestoreData } from "../store/userFirestoreData";
import { UserDataProps } from "../components/utilities/userDataProps";

const userFirestoreUpdate = async (uid: string) => {
	const dataRef = doc(db, `users/${uid}`);

	const dispatch = useAppDispatch();
	const unsubscribe = onSnapshot(dataRef, (doc: DocumentSnapshot) => {
		if (doc.exists()) {
			const data = doc.data() as UserDataProps;
			dispatch(setUserFirestoreData(data));
		}
	});

	return unsubscribe;
};

export default userFirestoreUpdate;
