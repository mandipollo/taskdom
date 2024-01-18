import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";

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
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		await updateProfile(userCredential.user, { displayName });
		const user = userCredential.user;
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
