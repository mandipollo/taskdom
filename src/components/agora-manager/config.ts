import { EncryptionMode, UID, SDK_MODE } from "agora-rtc-sdk-ng";

export type configType = {
	uid: UID;
	appId: string;
	channelName: string;
	rtcToken: string | null;
	serverUrl: string;
	proxyUrl: string;
	tokenExpiryTime: number;
	token: string;
	encryptionMode: EncryptionMode;
	salt: "";
	encryptionKey: string;
	destUID: number;
	destChannelName: string;
	destChannelToken: string;
	secondChannel: string;
	secondChannelToken: string;
	secondChannelUID: number;
	selectedProduct: SDK_MODE;
};
const config: configType = {
	uid: 0,
	appId: "57ef537f90c24a8ab6e71cc13d4a4473",
	channelName: "test",
	rtcToken:
		"007eJxTYHi+ye/TC6fnN8xtnjxQO1C5rUrqtl5/5uJ27TlMjd7pnxcoMJiap6aZGpunWRokG5kkWiQmmaWaGyYnGxqnmCSamJgbB1mYpTUEMjK0bvzGwsgAgSA+C0NJanEJAwMA7EohIQ==",
	serverUrl: "",
	proxyUrl: "http://localhost:8080/",
	tokenExpiryTime: 600,
	token: "",
	encryptionMode: "aes-128-gcm2",
	salt: "",
	encryptionKey: "",
	destChannelName: "",
	destChannelToken: "",
	destUID: 2,
	secondChannel: "",
	secondChannelToken: "",
	secondChannelUID: 2,
	selectedProduct: "rtc",
};

export default config;
