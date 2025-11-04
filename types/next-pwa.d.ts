// types/next-pwa.d.ts

// Ini memberitahu TypeScript "Percaya padaku, module 'next-pwa' itu ada"
declare module "next-pwa" {
	import { NextConfig } from "next";

	// Kita definisikan tipe PWAConfig secara manual (hanya yg kita butuh)
	export interface PWAConfig {
		dest?: string;
		register?: boolean;
		skipWaiting?: boolean;
		disable?: boolean;
		sw?: string;
		[key: string]: any; // Izinkan properti lain
	}

	// Kita definisikan tipe fungsi withPWA
	function withPWA(
		pwaConfig: PWAConfig
	): (nextConfig: NextConfig) => NextConfig;

	export default withPWA;
}
