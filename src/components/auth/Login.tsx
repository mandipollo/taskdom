import React, { useState } from "react";
import prev from "../../assets/previous.svg";

import loginLogo from "../../assets/loginLogo.svg";
import { Link } from "react-router-dom";
import facebookLogo from "../../assets/facebook.svg";
import instagramLogo from "../../assets/instagram.svg";
import { useAppDispatch } from "../../store/store";
import { setEmailState } from "../../store/emailSlice";

import isValidEmail from "../utilities/emailValidation";
import isPasswordValid from "../utilities/passwordValidation";
import signInUser from "../../firebaseAuth/signInUser";

const Login: React.FC = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string | null>(null);
	const [emailValidity, setEmailValidity] = useState<boolean>(true);
	const [password, setPassword] = useState<string | null>(null);
	const [passwordValidity, setPasswordValidity] = useState<boolean>(true);
	const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);

	const [error, setError] = useState<string | null>(null);

	// email validation

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleNext = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (isValidEmail(email) === false) {
			setEmailValidity(false);
		} else if (isValidEmail(email)) {
			setEmailValidity(true);
			dispatch(setEmailState(email));
			setShowPasswordForm(true);
		}
	};
	const handlePrev = () => {
		setShowPasswordForm(false);
	};
	const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (isPasswordValid(password) === false) {
			setPasswordValidity(false);
			console.log("invalid pw");

			return;
		} else {
			try {
				isPasswordValid(password);
				setPasswordValidity(true);
				const { user, error } = await signInUser({ email, password });
				console.log(user, error);

				setError(error);
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
	const emailFormClass: string = ` ${
		showPasswordForm ? "hidden " : "flex"
	}  relative flex-col justify-center items-center h-2/4  md:w-2/4 sm:w-3/4 w-3/4 bg-white shadow-lg  `;

	const passwordFormClass: string = `${
		showPasswordForm ? "flex" : "hidden"
	}  relative flex-col justify-center items-center h-2/4  md:w-2/4 sm:w-3/4 w-3/4 bg-white shadow-lg`;

	const previousBtnClass: string = `${
		showPasswordForm ? "flex" : "hidden"
	} absolute  top-0 bottom-0 left-0 `;

	const emailTextHelper: string = `${
		emailValidity ? "hidden" : "flex"
	}  text-red-500`;

	const passwordTextHelper: string = `${
		passwordValidity ? "hidden" : "flex"
	}  text-red-500`;
	return (
		<div className="flex h-full flex-col ">
			<div className="flex justify-center items-center h-2/4 flex-col space-y-2">
				<img src={loginLogo} height={40} width={40}></img>
				<p className="text-lg md:text-sm ">iDon'tKnowUI</p>
			</div>
			<div className="flex flex-col h-2/4 justify-center items-center flex-1">
				{/* email section */}
				<form className={emailFormClass}>
					<div className="flex  flex-col w-full h-full justify-center items-center space-y-4 flex-1 ">
						<input
							onChange={emailHandler}
							value={email ?? ""}
							className="border-gray-300  outline-none border-b  text-center w-3/4 "
							placeholder="Enter your email"
							type="email"
						></input>
						<p className={emailTextHelper}>
							Please provide a valid email address
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
						disabled={!email}
						onClick={handleNext}
						type="button"
						className="absolute -bottom-5 rounded-2xl bg-black text-white py-2 px-12"
					>
						NEXT
					</button>
				</form>

				{/* password section */}
				<form className={passwordFormClass}>
					<div className="flex  flex-col w-full h-full justify-center items-center space-y-4 flex-1 ">
						<input
							onChange={passwordHandler}
							value={password ?? ""}
							className="border-gray-300  outline-none border-b  text-center w-3/4 "
							placeholder="Enter your password"
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
						SIGN IN
					</button>
				</form>

				<div className="flex relative h-2/4 w-3/4  justify-center items-center  ">
					<div className={previousBtnClass}>
						<button type="button" onClick={handlePrev}>
							<img src={prev} height={40} width={40}></img>
						</button>
					</div>

					<Link to="/signup">
						<button className="font-semibold font-montserrat tracking-wider">
							SIGN UP
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
