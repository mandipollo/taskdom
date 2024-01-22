import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";

const getProfileImage = (profileImagePath: string) => {
	const url = getDownloadURL(ref(storage, profileImagePath)).then(url => {
		// `url` is the download URL for 'images/stars.jpg'
		// Or inserted into an <img> element
		// const img = document.getElementById("myimg");
		// img.setAttribute("src", url);

		return url;
	});

	return url;
};

export default getProfileImage;
