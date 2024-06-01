// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, writeBatch } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyALVONi7EfJZdD-DirEJBxXQQq8XN2n9_k",
	authDomain: "taskdom.firebaseapp.com",
	databaseURL: "https://taskdom-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "taskdom",
	storageBucket: "taskdom.appspot.com",
	messagingSenderId: "1065663237998",
	appId: "1:1065663237998:web:b17a20d1c7ee89a5a93b7f",
	measurementId: "G-NSMNYFE6KR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
export const batch = writeBatch(db);
export const messaging = getMessaging(app);

export const generateToken = async () => {
	const permission = await Notification.requestPermission();
	console.log(permission);

	if (permission === "granted") {
		const token = await getToken(messaging, {
			vapidKey:
				"BCgVvescJc9l3JNDTPuazVhxKK9zu_hTKhj1l2-JcjDAkqr9XNnx7h2oh2LKzJcxiaD8RtsaMOmqpftz_qHL4Gw",
		});
		console.log(token);
	}
};
