import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase.config";

const getFirestoreData = async () => {
	return new Promise(async (resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(async user => {
			if (user) {
				// User is signed in
				const uid = user.uid;
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
				} finally {
					// Ensure to unsubscribe from the onAuthStateChanged listener
					unsubscribe();
				}
			} else {
				// User not signed in
				reject("User not signed in");
				unsubscribe(); // Ensure to unsubscribe from the listener
			}
		});
	});
};

export default getFirestoreData;
