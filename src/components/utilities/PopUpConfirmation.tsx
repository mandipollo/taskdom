import React from "react";

interface PopUpConfirmationProps {
	message: string;
	onCancel: () => void;
	onConfirm: () => void;
	isOpen: Boolean;
}

const PopUpConfirmation: React.FC<PopUpConfirmationProps> = ({
	message,
	onCancel,
	onConfirm,
	isOpen,
}) => {
	if (!isOpen) return null;

	return (
		<div className="flex right-1 top-1 absolute  justify-center items-center flex-col p-2 border border-[#30363E] bg-[#0D1117]">
			<p>{message}</p>
			<div className="flex ">
				<button
					className="px-2 hover:underline hover:bg-gray-800"
					onClick={() => onCancel()}
				>
					Cancel
				</button>
				<button
					className="px-2 hover:underline hover:bg-red-800"
					onClick={() => onConfirm()}
				>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default PopUpConfirmation;
