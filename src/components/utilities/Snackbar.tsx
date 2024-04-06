import React from "react";

interface Snackbarprops {
	message: string;
	snackbarState: boolean;
}
const Snackbar: React.FC<Snackbarprops> = ({ message, snackbarState }) => {
	return (
		<div
			className={`absolute bottom-4 left-0 right-0 flex w-40 p-2 h-10 bg-green-400 justify-center align-center rounded-sm mx-auto transition duration-500 ease-in-out transform ${
				snackbarState ? "flex" : "hidden"
			}`}
		>
			<p className="text-md text-white">{message}</p>
		</div>
	);
};

export default Snackbar;
