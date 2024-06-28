import React, { useRef, useState } from "react";
import sendIcon from "../../../assets/sendIcon.svg";
import attach from "../../../assets/attach.svg";
import { useAppSelector } from "../../../store/store";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../../../firebase.config";

import {
	Timestamp,
	collection,
	doc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import getProfileImage from "../../../firebaseAuth/getProfileImage";
import { ref, uploadBytesResumable } from "firebase/storage";

const ChatInput = () => {
	const uid = useAppSelector(state => state.auth.uid);
	const chatState = useAppSelector(state => state.chat);
	const [text, setText] = useState<string | null>(null);
	const [img, setImg] = useState<File | undefined>(undefined);

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
	const handleSend = async (e: React.FormEvent<HTMLElement>) => {
		e.preventDefault();
		if (!chatState.user) {
			return;
		}

		const chatRef = doc(db, `chats/${chatState.user.chatId}`);
		const messageRef = collection(chatRef, "message");

		if (img && chatState.user) {
			const storageRef = ref(storage, uuid());

			const uploadTask = await uploadBytesResumable(storageRef, img);

			const url = await getProfileImage(uploadTask.metadata.fullPath);

			await setDoc(doc(messageRef), {
				id: uuid(),
				senderId: uid,
				date: Timestamp.now(),
				image: url ? url : null,
			});
		} else {
			if (text) {
				await setDoc(doc(messageRef), {
					id: uuid(),
					text,
					senderId: uid,
					date: Timestamp.now(),
				});
			}

			// update current user last message

			await updateDoc(
				doc(db, `users/${uid}/connections/${chatState.user.uid}`),
				{
					lastMessage: {
						text,
						date: serverTimestamp(),
					},
				}
			);
			// update the chat user last message
			await updateDoc(
				doc(db, `users/${chatState.user.uid}/connections/${uid}`),
				{
					lastMessage: {
						text,
						date: serverTimestamp(),
					},
				}
			);
		}
		setText(null);
		setImg(undefined);
	};

	return (
		<form
			onSubmit={handleSend}
			className="flex h-20 absolute bottom-0 right-0 left-0 w-full border-t border-[#30363E] space-x-4 justify-center items-center bg-[#0D1117]"
		>
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
				type="submit"
				onClick={handleSend}
				className="h-10 rounded-md bg-[#508D69] flex flex-row w-32 justify-around items-center "
			>
				<p>Send</p>
				<img src={sendIcon} alt="send message" width={20} height={20} />
			</button>
		</form>
	);
};

export default ChatInput;
