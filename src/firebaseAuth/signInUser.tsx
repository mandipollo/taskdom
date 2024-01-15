import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
type checkUserProps = {
	email: string | null;
	password: string | null;
};

type signInResult = {
	user: any | null;
	error: null | string;
};

const signInUser = async ({
	email,
	password,
}: checkUserProps): Promise<signInResult> => {
	if (!email || !password) {
		const errorMessage = "oops something went wrong!";
		console.log("email or passwor is null");

		return { user: null, error: errorMessage };
	}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
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

export default signInUser;
