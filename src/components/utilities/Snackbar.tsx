import React from "react";

interface Snackbarprops {
	message: string | null;
	show: boolean;
}
const Snackbar: React.FC<Snackbarprops> = ({ message, show }) => {
	return (
		<div
			className={` absolute bottom-4 left-0 right-0 w-40 flex p-2 h-10 bg-green-400 justify-center align-center rounded-sm mx-auto transition duration-500 ease-in-out transform ${
				show ? "opacity-100" : "opacity-0"
			}`}
		>
			<p className="text-md text-white">{message}</p>
		</div>
	);
};

export default Snackbar;
