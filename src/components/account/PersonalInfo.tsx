import React, { useEffect, useRef, useState } from "react";

import { ref } from "firebase/storage";
import { storage, auth, functions } from "../../../firebase.config";
import { uploadBytes } from "firebase/storage";
import { db } from "../../../firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import getProfileImage from "../../firebaseAuth/getProfileImage";
import { UserDataProps } from "../utilities/userDataProps";
import { User, updateProfile } from "firebase/auth";
import { setSnackBar, hideSnackbar } from "../../store/snackBarSlice";

import { useAppDispatch } from "../../store/store";
import { httpsCallable } from "firebase/functions";
import { EditSvg } from "../../assets/action/ActionSvgs";
type personalProps = {
	userFirestoreData: UserDataProps | null;
};

const PersonalInfo: React.FC<personalProps> = ({ userFirestoreData }) => {
	if (!userFirestoreData) {
		// Render a loading state or return null if userFirestoreData is null
		return null;
	}

	const dispatch = useAppDispatch();

	//  snackbar

	const { displayName, contactNo, workHours, jobTitle, uid } =
		userFirestoreData;

	// default profile picture

	const defaultPic = displayName.charAt(0).toUpperCase();
	//inputs

	const [job, setJob] = useState<string>(jobTitle);
	const [name, setName] = useState<string>(displayName);
	const [workTime, setWorkTime] = useState<string>(workHours);
	const [contactPh, setContactPh] = useState<string>(contactNo);
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

	//image handler
	const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("image handler 1st");
		if (e.target.files && e.target.files.length > 0) {
			// input file
			const selectedFile = e.target.files[0];
			// setImage(selectedFile);
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

			dispatch(setSnackBar({ show: true, message: "Image updated!" }));
			setTimeout(() => {
				dispatch(hideSnackbar());
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};
	// update user info on the firestore

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const updatePersonalInfo = httpsCallable(functions, "updatePersonalInfo");

		try {
			const res = await updatePersonalInfo({
				displayName: name,
				contactNo: contactPh,
				jobTitle: job,
				workHours: workTime,
			});

			console.log(res.data);

			dispatch(setSnackBar({ show: true, message: "Profile updated!" }));
			setTimeout(() => {
				dispatch(hideSnackbar());
			}, 2000);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section className="flex  h-full  w-full p-2 lg:flex-row flex-col dark:border-t-darkBorder border-t  dark:text-darkText ">
			<div className="md:h-36 md:w-36 h-20 w-20 overflow-hidden flex justify-center items-center rounded-full relative 0">
				{user?.photoURL ? (
					<img
						src={user?.photoURL || ""}
						alt="Profile picture"
						className="rounded-full object-cover w-32 h-32"
					></img>
				) : (
					<span className="flex justify-center items-center text-black text-4xl rounded-full w-32 h-32 p-2 bg-gray-300">
						{defaultPic}
					</span>
				)}

				<input
					aria-label="choose profile picture"
					type="file"
					accept="image/*"
					onChange={imageHandler}
					style={{ display: "none" }}
					ref={fileInputRef}
				/>
				<button
					onClick={() => fileInputRef.current && fileInputRef.current.click()}
					className="absolute flex justify-center items-center rounded-full md:h-10 md:w-10 h-5 w-5 md:bottom-5 bottom-2 right-2  bg-gray-600 text-[#E6EDF3] "
				>
					<EditSvg width={20} height={20} className="text-white" />
				</button>
			</div>
			<form
				id="personal-info"
				onSubmit={submitHandler}
				className="flex md:flex-row flex-col h-full w-full gap-2 flex-1 "
			>
				<div className=" h-full space-y-2 md:items-center flex flex-col">
					<div className="flex flex-col">
						<label
							aria-label="input display name"
							htmlFor="display-name-input"
							className="dark:text-gray-400 text-black"
						>
							Display Name
						</label>

						<input
							id="display-name-input"
							placeholder={displayName}
							onChange={nameHandler}
							value={name || ""}
							type="text"
							className="flex p-2 md:w-60 rounded-md focus:outline-0 dark:bg-[#161B22] dark:placeholder-[#E6EDF3] dark:text-[#E6EDF3] text-black  outline-none "
						/>
					</div>
					<div className="flex flex-col">
						<label
							aria-label="Input work hours"
							htmlFor="work-hours-input"
							className="dark:text-gray-400 text-black"
						>
							Work hours
						</label>

						<input
							id="work-hours-input"
							placeholder={workHours || ""}
							onChange={workTimeHandler}
							value={workTime || ""}
							className="flex p-2 md:w-60 rounded-md focus:outline-0 dark:bg-[#161B22] dark:placeholder-darkText dark:text-darkText text-black outline-none "
							type="text"
						/>
					</div>
				</div>
				<div className=" h-full space-y-2 md:items-center flex flex-col">
					<div className="flex flex-col">
						<label
							aria-label="input job title"
							htmlFor="job-title-input"
							className="dark:text-gray-400 text-black"
						>
							Job Title
						</label>

						<input
							id="job-title-input"
							placeholder={jobTitle || ""}
							type="text"
							onChange={jobHandler}
							value={job || ""}
							className="flex p-2 md:w-60 rounded-md focus:outline-0 dark:bg-darkSecondary dark:placeholder-darkText dark:text-darkText text-black outline-none "
						/>
					</div>
					<div className="flex flex-col">
						<label
							aria-label="input contact number"
							htmlFor="contact-input"
							className="dark:text-gray-400 text-black"
						>
							Contact no.
						</label>

						<input
							id="contact-input"
							placeholder={contactNo || ""}
							onChange={contactPhHandler}
							value={contactPh || ""}
							className="flex p-2 md:w-60 rounded-md focus:outline-0 dark:bg-darkSecondary dark:placeholder-darkText dark:text-darkText text-black outline-none "
							type="text"
						/>
					</div>

					<button
						aria-label="Save changes"
						type="submit"
						className="bg-primaryBlue w-full p-2 rounded-md text-white  text-lg "
					>
						Save changes
					</button>
				</div>
			</form>
		</section>
	);
};

export default PersonalInfo;
