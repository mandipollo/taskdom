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
	const inputClass = `flex p-2 rounded-md focus:outline-0 bg-[#161B22] placeholder-[#E6EDF3] text-[#E6EDF3]  outline-none `;
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
		<div className="flex  h-full  w-full p-2 md:flex-row md:space-x-10 flex-col border-t-[#30363E] border-t text-[#E6EDF3] ">
			<Snackbar message={snackbarState.message} show={snackbarState.show} />
			<form
				id="personalInfo"
				onSubmit={handleSubmitPassword}
				className="flex flex-col h-full w-full flex-1 "
			>
				<p>Choose a strong password and don't reuse it for other accounts.</p>

				<div className={inputDivClass}>
					<p className="text-gray-400">New Password</p>

					<input
						onChange={handlePassword}
						value={password || ""}
						type="text"
						className={inputClass}
					/>
				</div>
				<div className={inputDivClass}>
					<p className="text-gray-400">Confirm Password</p>

					<input
						onChange={handleConfirmPassword}
						value={confirmPassword || ""}
						className={inputClass}
						type="text"
					/>
					{err && <p className="text-sm text-red-400">{err}</p>}
				</div>
				<button
					type="submit"
					className="bg-[#508D69] w-full p-2 rounded-md  text-lg md:w-60 mt-2"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default LoginAndSecurity;
