import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { functions } from "../../../firebase.config";
import Snackbar from "../utilities/Snackbar";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSnackBar, hideSnackbar } from "../../store/snackBarSlice";

interface LoginAndSecurityProps {}
const LoginAndSecurity: React.FC<LoginAndSecurityProps> = ({}) => {
	// snack bar
	const dispatch = useAppDispatch();
	const snackbarState = useAppSelector(state => state.snackBar);

	// css classes
	const inputClass = `flex p-2 rounded-md focus:outline-0 dark:bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3]  outline-none `;
	const inputDivClass = `flex flex-col space-y-2 md:w-60`;

	// local states
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [err, setErr] = useState<string>("");

	// handlers
	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const changePassword = httpsCallable(functions, "changePassword");

		try {
			if (password !== confirmPassword) {
				throw new Error("Password needs to match");
			}

			const res = await changePassword({ password, confirmPassword });
			dispatch(
				setSnackBar({ show: true, message: "Password successfully updated!" })
			);
			setTimeout(() => {
				dispatch(hideSnackbar());
			}, 2000);
			setPassword("");
			setConfirmPassword("");
			console.log(res.data);
		} catch (err) {
			console.error(err);
			setErr("Password does not match");
		}
	};
	return (
		<section className="flex  h-full  w-full p-2 md:flex-row md:space-x-10 flex-col dark:border-t-darkBorder border-t  dark:text-darkText ">
			<Snackbar message={snackbarState.message} show={snackbarState.show} />
			<form
				id="personal-info"
				onSubmit={handleSubmitPassword}
				className="flex flex-col h-full w-full flex-1 "
			>
				<p>Choose a strong password and don't reuse it for other accounts.</p>

				<div className={inputDivClass}>
					<label
						aria-label="input new password"
						htmlFor="password-input"
						className="text-gray-400"
					>
						New Password
					</label>

					<input
						id="password-input"
						onChange={handlePassword}
						value={password || ""}
						type="password"
						className={inputClass}
					/>
				</div>
				<div className={inputDivClass}>
					<label
						aria-label="confirm new password"
						htmlFor="confirm-password-input"
						className="text-gray-400"
					>
						Confirm Password
					</label>

					<input
						id="confirm-password-input"
						onChange={handleConfirmPassword}
						value={confirmPassword || ""}
						className={inputClass}
						type="password"
					/>
					{err && <p className="text-sm text-red-400">{err}</p>}
				</div>
				<button
					aria-label="Save"
					type="submit"
					className=" w-full p-2 rounded-md bg-primaryBlue text-lg md:w-60 mt-2"
				>
					Submit
				</button>
			</form>
		</section>
	);
};

export default LoginAndSecurity;
