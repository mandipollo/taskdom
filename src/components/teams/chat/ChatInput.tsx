import React, { useRef, useState } from "react";

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
import { AttachSvg } from "../../../assets/Icons/Icons";

const ChatInput = () => {
	const uid = useAppSelector(state => state.userFirestoreData.uid);
	const chatState = useAppSelector(state => state.chat);
	const [text, setText] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);
	// message

	const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	// send img to storage and get url
	const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0 && chatState.user) {
			const chatRef = doc(db, `chats/${chatState.user.chatId}`);
			const messageRef = collection(chatRef, "message");
			// input file

			const storageRef = ref(storage, uuid());
			const uploadImg = await uploadBytesResumable(
				storageRef,
				e.target.files[0]
			);

			const imgUrl = await getProfileImage(uploadImg.metadata.fullPath);
			await setDoc(doc(messageRef), {
				id: uuid(),
				senderId: uid,
				date: Timestamp.now(),
				image: imgUrl,
			});
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

		if (text) {
			await setDoc(doc(messageRef), {
				id: uuid(),
				text,
				senderId: uid,
				date: Timestamp.now(),
			});
		}

		// update current user last message

		await updateDoc(doc(db, `users/${uid}/connections/${chatState.user.uid}`), {
			lastMessage: {
				text,
				date: serverTimestamp(),
			},
		});
		// update the chat user last message
		await updateDoc(doc(db, `users/${chatState.user.uid}/connections/${uid}`), {
			lastMessage: {
				text,
				date: serverTimestamp(),
			},
		});

		setText(null);
	};

	return (
		<form
			onSubmit={handleSend}
			id="inputSubmit"
			className="flex h-20 absolute bottom-0 right-0 left-0 w-full space-x-2 justify-center items-center  "
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
					<AttachSvg
						height={25}
						width={25}
						className="text-black dark:text-white"
					/>
				</label>
			</div>

			<input
				value={text || ""}
				onChange={textHandler}
				placeholder="Type a message"
				className="rounded-md placeholder-gray-400 w-10/12 h-10 outline-darkBorder outline-2 pl-2 border-darkBorder bg-darkSecondary "
				type="text"
			/>
		</form>
	);
};

export default ChatInput;
