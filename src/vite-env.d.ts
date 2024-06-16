/// <reference types="vite/client" />

// src/vite-env.d.ts

interface ImportMetaEnv {
	readonly VITE_API_KEY: string;
	readonly VITE_AUTH_DOMAIN: string;
	readonly VITE_PROJECT_ID: string;
	readonly VITE_STORAGE_BUCKET: string;
	readonly VITE_MESSAGING_SENDER_ID: string;
	readonly VITE_APP_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly VITE_FIREBASE_API_KEY: string;
	readonly VITE_FIREBASE_DATABASE_URL: string;
	readonly VITE_FIREBASE_PROJECTID: string;
	readonly VITE_FIREBASE_STORAGE_BUCKET: string;
	readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
	readonly VITE_FIREBASE_APP_ID: string;
	readonly VITE_FIREBASE_MEASUREMENT_ID: string;
	readonly VITE_FIREBASE_AUTH_DOMAIN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
