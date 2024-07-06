import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import isValidEmail from "../components/utilities/emailValidation";
import isPasswordValid from "../components/utilities/passwordValidation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string | null>(null);

	const [password, setPassword] = useState<string | null>(null);

	const [error, setError] = useState<string>("");

	// input handlers
	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	// sign in then fetch user data to sync with state

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Missing email or password!");
			return;
		}

		// handle password validation
		if (!isPasswordValid(password) || !isValidEmail(email)) {
			setError("Invalid email or password!");
			return;
		}
		try {
			// sign in user
			await signInWithEmailAndPassword(auth, email, password);

			navigate("/userDashboard");
		} catch (err: any) {
			setError(err.message);
		}
	};
	return (
		<main className="flex gap-4 h-full w-full justify-center items-center flex-col bg-gradient-to-br from-black from-40%  via-[#613F5A] to-black">
			<form
				onSubmit={handleSubmit}
				id="login-form"
				className="flex relative flex-col justify-center items-center h-2/4  md:w-2/4 sm:w-3/4 w-3/4 "
			>
				<section className="flex  flex-col w-full h-full justify-center items-center space-y-4 flex-1 ">
					<label aria-label="input email " htmlFor="email-input">
						Email
					</label>
					<input
						id="email-input"
						autoFocus={true}
						onChange={emailHandler}
						value={email ?? ""}
						className="py-2 bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3]  outline-none border-b border-[#30363E] text-center md:w-60 w-40 rounded-md  "
						placeholder="Enter your email"
						type="email"
					></input>

					<label aria-label="ipnut password" htmlFor="password-input">
						Password
					</label>
					<input
						id="password-input"
						onChange={passwordHandler}
						value={password ?? ""}
						className="py-2 bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3]  outline-none border-b border-[#30363E] text-center md:w-60 w-40 rounded-md "
						placeholder="Enter your password"
						type="password"
					></input>
					{error && <p className="text-red-500">{error}</p>}
				</section>
				<button
					aria-label="Sign in"
					type="submit"
					className="  rounded-2xl bg-[#0D1117] border-[#30363E] border text-[#E6EDF3] py-2 px-12 "
				>
					Sign in
				</button>
			</form>

			<section className="flex relative justify-center items-center gap-2 ">
				<article>Don't have an Account? </article>
				<Link to="/signup" aria-label="Navigate to sign up">
					<button className="rounded-2xl  text-green-400   font-semibold font-montserrat tracking-wider">
						Sign up
					</button>
				</Link>
			</section>
		</main>
	);
};

export default LoginPage;
