import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// slice
import email from "./emailSlice";
import auth from "./authSlice";
import chat from "./chatSlice";
import snackBar from "./snackBarSlice";
import agoraReducer from "./agoraSlice";

import userFirestoreData from "./userFirestoreData";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
	userFirestoreData,
	email,
	auth,
	chat,
	snackBar,
	agora: agoraReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;
