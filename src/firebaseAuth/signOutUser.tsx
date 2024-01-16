import { auth } from "../../firebase.config";

const signOutUser = (): void => {
	if (auth.currentUser) {
		auth.signOut();
	}
};

export default signOutUser;
