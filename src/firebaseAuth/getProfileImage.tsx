import { ref, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebase.config";
import avatar from "../assets/avatar.jpg";

// fetch and return image url from storage
const getProfileImage = async (profileImagePath: string) => {
	const user = auth.currentUser?.uid;

	if (user) {
		const storageRef = ref(storage, profileImagePath);

		try {
			const url = await getDownloadURL(storageRef);

			return url;
		} catch (error) {
			console.error("Error getting download URL:", error);
			return avatar; // Replace with the default image URL
		}
	}

	return avatar;
};

export default getProfileImage;
