import React, { useEffect, useRef, useState } from "react";
import avatar from "../../assets/manAvatar.svg";
import updateUserInfo from "../../firebaseAuth/updateUserInfo";
import { ref } from "firebase/storage";
import { storage, auth } from "../../../firebase.config";
import { uploadBytes } from "firebase/storage";
import { db } from "../../../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import getProfileImage from "../../firebaseAuth/getProfileImage";
import { userDataProps } from "../utilities/userDataProps";
import { User, updateProfile } from "firebase/auth";
type personalProps = {
	userFirestoreData: userDataProps | null;
};

const PersonalInfo: React.FC<personalProps> = ({ userFirestoreData }) => {
	if (!userFirestoreData) {
		// Render a loading state or return null if userFirestoreData is null
		return null;
	}

	// retrieve user info from the redux
	const { displayName, contactNo, workHours, jobTitle, uid } =
		userFirestoreData || {
			displayName: "",
			contactNo: "",
			workHours: null,
			jobTitle: null,
			uid: "",
			profileImage: "",
		};

	// inputs

	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [job, setJob] = useState<string | null>(null);
	const [name, setName] = useState<string | null>(null);
	const [workTime, setWorkTime] = useState<string | null>(null);
	const [contactPh, setContactPh] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// get auth user
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
		});

		return () => unsubscribe(); // Cleanup the subscription on component unmount
	}, []);

	const jobHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setJob(e.target.value);
	};
	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const workTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWorkTime(e.target.value);
	};
	const contactPhHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContactPh(e.target.value);
	};

	// toggle paragraph and inputs visibility
	const [showEdit, setShowEdit] = useState<string>("hidden");
	const [showEditBtn, setShowEditBtn] = useState<string>("hidden");
	const [text, setText] = useState<string>("flex");

	const inputClass = `${showEdit} focus:outline-0`;
	const editBtn = `${showEditBtn} h-10 bottom-0 left-0 right-0  bg-gray-300`;
	const editBtnDiv = `${showEdit} flex-row py-2 justify-between w-3/4`;
	const showEditHandler: React.MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		setShowEdit("flex");
		setText("hidden");
		setShowEditBtn("absolute");
	};

	const hideEditHandler: React.MouseEventHandler<HTMLButtonElement> = e => {
		e.preventDefault();
		setShowEdit("hidden");
		setText("flex");
		setShowEditBtn("hidden");
	};

	//image handler
	const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("image handler 1st");
		if (e.target.files && e.target.files.length > 0) {
			// input file
			const selectedFile = e.target.files[0];
			setImage(selectedFile);
			console.log("image handler");

			await submitNewImageHandler(selectedFile);
		}
	};

	// submit newImage

	const submitNewImageHandler = async (selectedFile: File) => {
		// image file check

		try {
			if (selectedFile === null || uid === null) {
				console.log("no image selected");
				return;
			}
			// firestore ref
			const userFirestoreRef = doc(db, `users/${uid}`);
			const profileImageRef = ref(
				storage,
				`${uid}/profileImage/${selectedFile}`
			);

			// upload the image to the storage

			const snapshot = await uploadBytes(profileImageRef, selectedFile);
			console.log(snapshot);
			// get image url

			const url = await getProfileImage(snapshot.metadata.fullPath);

			// upload the image ref to the firestore

			await updateDoc(userFirestoreRef, {
				profileImage: url,
			});

			if (auth.currentUser === null) {
				console.log("current user not found");
				return;
			}
			// upload the url to the user auth
			await updateProfile(auth.currentUser, {
				photoURL: url,
			});
		} catch (err) {
			console.log(err);
		}
	};
	// update user info on the firestore
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (user === null) {
				console.log("no user");
				return;
			}

			// // image file check

			// if (image === null) {
			// 	console.log("no image selected");
			// 	return;
			// }
			// // firestore ref
			// const userFirestoreRef = doc(db, `users/${uid}`);
			// const profileImageRef = ref(storage, `${uid}/profileImage/${image}`);

			// // upload the image to the storage

			// const snapshot = await uploadBytes(
			// 	profileImageRef,
			// 	await image!.arrayBuffer()
			// );
			// console.log(snapshot);
			// // get image url

			// const url = await getProfileImage(snapshot.metadata.fullPath);

			// // upload the image ref to the firestore

			// await updateDoc(userFirestoreRef, {
			// 	profileImage: url,
			// });

			// if (auth.currentUser === null) {
			// 	console.log("current user not found");
			// 	return;
			// }
			// // upload the url to the user auth
			// await updateProfile(auth.currentUser, {
			// 	photoURL: url,
			// });

			// update firestore data
			await updateUserInfo({
				displayName: name,
				contactNo: contactPh,
				jobTitle: job,
				workHours: workTime,
			});

			// update auth
			await updateProfile(user, {
				displayName: name,
			});
			setShowEdit("hidden");
			setText("flex");
			console.log("submitted");
		} catch (error) {
			setError(true);
		}
	};
	return (
		<div className="flex h-full w-full pt-2 pl-2 md:flex-row md:space-x-10 flex-col  bg-white">
			<div className="h-36 w-36 overflow-hidden flex justify-center items-center rounded-full relative 0">
				<img
					src={user?.photoURL || avatar}
					height="100%"
					width="100%"
					alt="Profile picture"
					className="rounded-full "
				></img>
				<input
					type="file"
					accept="image/*"
					onChange={imageHandler}
					style={{ display: "none" }}
					ref={fileInputRef}
				/>
				<button
					onClick={() => fileInputRef.current && fileInputRef.current.click()}
					className={editBtn}
				>
					EDIT
				</button>
			</div>
			<form onSubmit={submitHandler} className="flex flex-col flex-1 ">
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<div className="flex justify-between">
						<p className="text-gray-400">Display Name</p>
						<button
							onClick={showEditHandler}
							className="bg-[#508D69] rounded-md px-4  text-lg text-white"
						>
							EDIT
						</button>
					</div>

					<p className={text}>{displayName}</p>
					<input
						placeholder={displayName}
						onChange={nameHandler}
						value={name || ""}
						type="text"
						className={inputClass}
					/>
				</div>

				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Job Title</p>
					<p className={text}>{jobTitle}</p>
					<input
						placeholder={jobTitle || ""}
						type="text"
						onChange={jobHandler}
						value={job || ""}
						className={inputClass}
					/>
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Work hours</p>
					<p className={text}>{workHours}</p>
					<input
						placeholder={workHours || ""}
						onChange={workTimeHandler}
						value={workTime || ""}
						className={inputClass}
						type="text"
					/>
				</div>
				<div className="flex flex-col space-y-2 w-3/4 border-b">
					<p className="text-gray-400">Contact no.</p>
					<p className={text}>{contactNo}</p>
					<input
						placeholder={contactNo || ""}
						onChange={contactPhHandler}
						value={contactPh || ""}
						className={inputClass}
						type="text"
					/>
				</div>
				<div className={editBtnDiv}>
					<button
						onClick={hideEditHandler}
						className="bg-[#508D69] rounded-md px-4  text-lg text-white"
					>
						CANCEL
					</button>
					<button
						type="submit"
						className="bg-[#508D69] rounded-md px-8  text-lg text-white"
					>
						SAVE
					</button>
				</div>
			</form>
			{error && <span>{error}</span>}
		</div>
	);
};

export default PersonalInfo;
