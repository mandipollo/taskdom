import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import isValidEmail from "../components/utilities/emailValidation";
import isPasswordValid from "../components/utilities/passwordValidation";

import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { doc, setDoc } from "firebase/firestore";

const SignupPage: React.FC = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string | null>(null);

	const [password, setPassword] = useState<string | null>(null);

	const [displayName, setDisplayName] = useState<string | null>(null);

	const [error, setError] = useState<string | null>(null);

	//  validation

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const displayNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDisplayName(e.target.value);
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password || !displayName) {
			setError("Missing fields!");
			return;
		}
		if (!isPasswordValid(password) || !isValidEmail(email)) {
			setError("Invalid email or password!");
			return;
		}

		try {
			// sign up user
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			await sendEmailVerification(user);

			// update profile name
			await updateProfile(user, { displayName });

			// Add a new document in users collection
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				displayName: displayName,
				email: email,
				jobTitle: null,
				workHours: null,
				contactNo: null,
			});
			// Add a new document in userschat collection
			await setDoc(doc(db, "usersChat", user.uid), {});

			navigate("/userDashboard");
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<main className="flex  text-white w-full h-full flex-1 gap-4 justify-center items-center flex-col">
			<form
				onSubmit={handleSubmit}
				id="sign-up"
				className="flex  relative flex-col justify-center items-center h-3/4  md:w-2/4 sm:w-3/4 w-3/4 "
			>
				<section className="flex  flex-col w-full h-full justify-center items-center space-y-2 flex-1 ">
					<article className="flex text-2xl font-bold">Get started</article>

					<label aria-label="input display name" htmlFor="display-name-input">
						Display name
					</label>
					<input
						id="display-name-input"
						onChange={displayNameHandler}
						value={displayName ?? ""}
						className="py-2 text-black   border-darkBorder  outline-none border text-center md:w-60 w-40 rounded-md  "
						placeholder="Display name"
						type="text"
					></input>
					<label aria-label="input email" htmlFor="email-input">
						Email
					</label>
					<input
						id="email-input"
						onChange={emailHandler}
						value={email ?? ""}
						className="py-2 text-black  border-darkBorder  outline-none border text-center md:w-60 w-40 rounded-md  "
						placeholder="Email"
						type="email"
					></input>
					<label aria-label="input password" htmlFor="password-input">
						Password
					</label>
					<input
						id="password-input"
						onChange={passwordHandler}
						value={password ?? ""}
						className="py-2 text-black  border-darkBorder  outline-none border text-center md:w-60 w-40 rounded-md  "
						placeholder="Password"
						type="password"
					></input>
					<p className="text-red-500">{error}</p>
				</section>
				<button
					aria-label="Create account"
					disabled={!password}
					type="submit"
					className="rounded-2xl  border-darkBorder border  py-2 px-12"
				>
					CREATE FREE ACCOUNT
				</button>
				{error && <p>{error}</p>}
			</form>

			<section className="flex relative justify-center items-center  ">
				<Link to="/login" aria-label="Navigate to sign in">
					<button className="font-semibold font-montserrat  text-primaryBlue">
						Go back to sign in.
					</button>
				</Link>
			</section>
		</main>
	);
};

export default SignupPage;
