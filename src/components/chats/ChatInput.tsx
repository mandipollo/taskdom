import React, { useRef, useState } from "react";
import sendIcon from "../../assets/sendIcon.svg";
import attach from "../../assets/attach.svg";
import { useAppSelector } from "../../store/store";
import { v4 as uuid } from "uuid";
import {
	Timestamp,
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase.config";
import { ref, uploadBytesResumable } from "firebase/storage";
import getProfileImage from "../../firebaseAuth/getProfileImage";
type chatProps = {
	chatId: string | null;
	chatUserUid: string | null;
};
const ChatInput = ({ chatId, chatUserUid }: chatProps) => {
	const uid = useAppSelector(state => state.auth.uid);
	const [text, setText] = useState<string | null>(null);
	const [img, setImg] = useState<File | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);
	// message

	const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	// image
	const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			// input file
			setImg(e.target.files[0]);
		}
	};

	// send message to the chatId collection
	const handleSend = async () => {
		if (img) {
			const storageRef = ref(storage, uuid());

			const uploadTask = await uploadBytesResumable(storageRef, img);

			const url = await getProfileImage(uploadTask.metadata.fullPath);

			await updateDoc(doc(db, `chats/${chatId}`), {
				message: arrayUnion({
					id: uuid(),
					text,
					senderId: uid,
					date: Timestamp.now(),
					image: url,
				}),
			});
		} else {
			await updateDoc(doc(db, `chats/${chatId}`), {
				message: arrayUnion({
					id: uuid(),
					text,
					senderId: uid,
					date: Timestamp.now(),
				}),
			});

			// update current user last message

			await updateDoc(doc(db, `usersChat/${uid}`), {
				[chatId + ".lastMessage"]: {
					text,
				},
				[chatId + ".date"]: serverTimestamp(),
			});
			// update the chat user last message
			await updateDoc(doc(db, `usersChat/${chatUserUid}`), {
				[chatId + ".lastMessage"]: {
					text,
				},
				[chatId + ".date"]: serverTimestamp(),
			});
		}
		setText(null);
		setImg(null);
	};
	return (
		<div className="flex h-20 w-full border-t border-[#30363E] space-x-4 justify-center items-center">
			<div className="relative">
				<input
					onChange={imageHandler}
					type="file"
					accept="image/*"
					ref={fileInputRef}
					id="fileInput"
					className="sr-only"
				/>
				<label htmlFor="fileInput" className="flex items-center cursor-pointer">
					<img src={attach} width={25} height={25} alt="image upload" />
				</label>
			</div>

			<input
				value={text || ""}
				onChange={textHandler}
				placeholder="type a message"
				className="rounded-md placeholder-gray-400 w-8/12 h-10 outline-[#30363E] outline-2 pl-2 border-[#30363E] bg-[#161B22] "
				type="text"
			/>
			<button
				onClick={handleSend}
				className="h-10 rounded-md bg-[#508D69] flex flex-row w-32 justify-around items-center "
			>
				<p>Send</p>
				<img src={sendIcon} alt="send message" width={20} height={20} />
			</button>
		</div>
	);
};

export default ChatInput;
