import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import facebookLogo from "../../assets/facebook.svg";
import instagramLogo from "../../assets/instagram.svg";
import { useAppDispatch } from "../../store/store";
import { setEmailState } from "../../store/emailSlice";

import isValidEmail from "../utilities/emailValidation";
import isPasswordValid from "../utilities/passwordValidation";

import signUpUser from "../../firebaseAuth/signUpUser";

const Signup: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string | null>(null);
	const [emailValidity, setEmailValidity] = useState<boolean>(true);
	const [password, setPassword] = useState<string | null>(null);
	const [passwordValidity, setPasswordValidity] = useState<boolean>(true);
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
	const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (isPasswordValid(password) === false || isValidEmail(email) === false) {
			setEmailValidity(false);
			setPasswordValidity(false);

			console.log("Invalid credentials");

			return;
		} else {
			try {
				isPasswordValid(password);
				setPasswordValidity(true);
				setEmailValidity(true);
				dispatch(setEmailState(email));
				const { user, error } = await signUpUser({
					email,
					password,
					displayName,
				});
				console.log(user, error);

				setError(error);
				navigate("/");
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(null);
				}
			}
		}
	};
	// page turn animation

	const emailTextHelper: string = `${
		emailValidity ? "hidden" : "flex"
	}  text-red-500`;

	const passwordTextHelper: string = `${
		passwordValidity ? "hidden" : "flex"
	}  text-red-500`;
	return (
		<div className="flex flex-1 justify-center items-center flex-col ">
			<form className="flex  relative flex-col justify-center items-center h-3/4  md:w-2/4 sm:w-3/4 w-3/4 bg-white shadow-lg">
				<div className="flex  flex-col w-full h-full justify-center items-center space-y-4 flex-1 ">
					<p className="flex text-2xl font-bold">Get started</p>
					<p className="text-sm text-gray-400 flex text-wrap">
						We are limited by only our imagination
					</p>
					<input
						onChange={displayNameHandler}
						value={displayName ?? ""}
						className="border-gray-300  outline-none border-b  text-center w-3/4 "
						placeholder="What should we call you?"
						type="text"
					></input>
					<input
						onChange={emailHandler}
						value={email ?? ""}
						className="border-gray-300  outline-none border-b  text-center w-3/4 "
						placeholder="Email"
						type="email"
					></input>
					<p className={emailTextHelper}>
						Please provide a valid email address
					</p>
					<input
						onChange={passwordHandler}
						value={password ?? ""}
						className="border-gray-300  outline-none border-b  text-center w-3/4 "
						placeholder="Password"
						type="password"
					></input>
					<p className="text-red-500">{error}</p>
					<p className={passwordTextHelper}>
						The password needs to be 6 characters long
					</p>
					<div className="flex justify-center-items-center space-x-4">
						<img
							src={facebookLogo}
							alt="facebook logo"
							width={30}
							height={30}
						/>
						<img
							src={instagramLogo}
							alt="instagram logo"
							width={30}
							height={30}
						/>
					</div>
				</div>
				<button
					disabled={!password}
					onClick={handleSubmit}
					type="submit"
					className="absolute -bottom-5 rounded-2xl bg-black text-white py-2 px-12"
				>
					CREATE FREE ACCOUNT
				</button>
			</form>

			<div className="flex relative h-1/6 w-3/4  justify-center items-center  ">
				<Link to="/login">
					<button className="font-semibold font-montserrat tracking-wider">
						LOG IN
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Signup;
