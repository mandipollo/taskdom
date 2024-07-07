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
		<div className="flex right-1 top-1 absolute  justify-center items-center flex-col p-2 border border-darkBorder bg-lightPrimary dark:bg-darkSurface">
			<p>{message}</p>
			<div className="flex ">
				<button className="px-2 hover:underline" onClick={() => onCancel()}>
					Cancel
				</button>
				<button className="px-2 hover:underline" onClick={() => onConfirm()}>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default PopUpConfirmation;
