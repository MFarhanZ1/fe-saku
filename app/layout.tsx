import "./globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { geistMono, geistSans, spaceGrotesk } from "./fonts";

export const metadata: Metadata = {
	title: "SaKu - Sahabat Kuliah",
	description:
		"Layanan ojek online dari mahasiswa, oleh mahasiswa, untuk mahasiswa.",
	manifest: "/manifest.json",
};

export const viewport: Viewport = {
	themeColor: "#52c572",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id" suppressHydrationWarning>
			<head>
				<link
					rel="apple-touch-icon"
					href="/globals/saku-logo-192x192.png"
				/>
			</head>

			<body
				className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${geistSans.className} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
