import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const getFirestoreData = async (uid: string | undefined) => {
	return new Promise(async (resolve, reject) => {
		if (uid) {
			// User is signed in

			const docRef = doc(db, `users/${uid}`);

			try {
				const docSnap = await getDoc(docRef);
				const docData = docSnap.data();

				if (docSnap.exists()) {
					resolve(docData);
				} else {
					console.log("No such document!");
					resolve(docData);
				}
			} catch (error) {
				reject(error);
			}
		} else {
			// User not signed in
			reject("User not signed in");
		}
	});
};

export default getFirestoreData;
