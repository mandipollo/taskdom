import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

const signOutUser = async () => {
	if (auth.currentUser) {
		await signOut(auth);
	}
};

export default signOutUser;
