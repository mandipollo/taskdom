import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import getFirestoreData from "../../firebaseAuth/getFirestoreData";
import { setUserFirestoreData } from "../../store/userFirestoreData";
import { userDataProps } from "../utilities/userDataProps";

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState<string | null>(null);
	const [emailValidity, setEmailValidity] = useState<boolean>(true);
	const [password, setPassword] = useState<string | null>(null);
	const [passwordValidity, setPasswordValidity] = useState<boolean>(true);
	const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);

	const [error, setError] = useState<string | null>(null);

	// input handlers
	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	// email validation then show password section
	const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
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

	// submit function
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// handle password validation
		if (isPasswordValid(password) === false) {
			setPasswordValidity(false);

			return;
		} else {
			try {
				isPasswordValid(password);
				setPasswordValidity(true);

				// sign in user
				const { user, error } = await signInUser({ email, password });

				// store the user data in the redux

				const data = (await getFirestoreData(user.uid)) as userDataProps;
				console.log(data);

				dispatch(setUserFirestoreData(data));
				setError(error);
				navigate("/userDashboard");
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError(null);
				}
			}
		}
	};
	// dynamic classes
	const emailFormClass: string = ` ${
		showPasswordForm ? "hidden " : "flex"
	}  relative flex-col justify-center items-center h-2/4  md:w-2/4 sm:w-3/4 w-3/4 bg-white shadow-lg  `;

	const passwordFormClass: string = `${
		showPasswordForm ? "flex" : "hidden"
	}  relative flex-col justify-center items-center h-2/4   md:w-2/4 sm:w-3/4 w-3/4 bg-white shadow-lg`;

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
				<form onSubmit={handleNext} className={emailFormClass}>
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
						type="submit"
						className="absolute -bottom-5 rounded-2xl bg-black text-white py-2 px-12 z-10"
					>
						NEXT
					</button>
				</form>

				{/* password section */}
				<form onSubmit={handleSubmit} className={passwordFormClass}>
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
						type="submit"
						className="absolute -bottom-5 rounded-2xl bg-black text-white py-2 px-12 z-10"
					>
						SIGN IN
					</button>
				</form>

				<div className="flex relative h-2/4 w-3/4 justify-center items-center  ">
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
