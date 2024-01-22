import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";

type signupProps = {
	email: string | null;
	password: string | null;
	displayName: string | null;
};

type signUpResult = {
	user: any | null;
	error: null | string;
};

const signUpUser = async ({
	email,
	password,
	displayName,
}: signupProps): Promise<signUpResult> => {
	if (!email || !password) {
		const errorMessage = "oops something went wrong!";
		console.log("email or password is null");

		return { user: null, error: errorMessage };
	}

	try {
		// sign up user with email and password
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		// update displayName
		await updateProfile(user, { displayName });

		// Add a new document in collection "cities"
		await setDoc(doc(db, "users", user.uid), {
			uid: user.uid,
			displayName: displayName,
			email: email,
			jobTitle: null,
			workHours: null,
			contactNo: null,
		});

		return {
			user: user,
			error: null,
		};
	} catch (err: any) {
		const errorMessage = err.message;
		console.log(err);
		return { user: null, error: errorMessage };
	}
};

export default signUpUser;
