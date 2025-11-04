"use client";

import SakuLogo from "@/public/globals/saku-logo-512x512.png";
import HeroPreview from "@/public/pages/landing-pages/ilustrasi-no-bg.png";
import { useState, useEffect } from "react";

import {
	ArrowRight,
	UserPlus,
	AppWindow,
	Share,
	SquarePlus,
	MapPin,
	Rocket,
	Instagram,
	Twitter,
	DownloadIcon,
} from "lucide-react";

import Image from "next/image";

const Header: React.FC = () => {
	const [visible, setVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const controlNavbar = () => {
			if (typeof window !== "undefined") {
				if (window.scrollY > 100) {
					if (window.scrollY > lastScrollY) {
						setVisible(false);
					} else {
						setVisible(true);
					}
				} else {
					setVisible(true);
				}
				setLastScrollY(window.scrollY);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);
			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-4 transition-transform duration-300 ${
				visible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			{/* --- REVISI UI MODERN --- */}
			<div className="container mx-auto flex rounded-full bg-linear-to-r from-[#3ecf8e]/10 to-[#279299]/10 backdrop-blur-lg p-2 justify-between items-center border border-gray-700/50">
				{/* Logo */}
				<div className="flex gap-2 sm:gap-3 justify-center items-center font-space-grotesk text-xl md:text-2xl font-bold bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent pl-2">
					<Image
						className="rounded-md"
						src={SakuLogo}
						alt="Logo SaKu"
						width={40} // Dikecilkan sedikit
						height={40}
					/>
					<span className="hidden sm:inline">
						{" "}
						{/* Sembunyikan teks di layar xs */}
						saku
						<span className="italic font-medium text-gray-400">.click</span>
					</span>
				</div>

				{/* Navigasi (Ditambahkan kembali) */}
				<nav className="hidden md:flex items-center space-x-8 font-inter font-medium">
					<a
						href="#fitur"
						className="text-gray-300 hover:text-[#52c572] transition-colors duration-200 text-sm"
					>
						Kenapa harus menggunakan SaKu?
					</a>
					<a
						href="#lokasi"
						className="text-gray-300 hover:text-[#52c572] transition-colors duration-200 text-sm"
					>
						Baru beroperasi di-kampus mana aja sih?
					</a>
				</nav>

				{/* Tombol CTA (Revisi UI) */}
				<a href="#install" className="flex items-center justify-center font-inter font-semibold bg-linear-to-r from-[#3ecf8e] to-[#279299] text-black px-4 sm:px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200 text-sm shrink-0">
					<DownloadIcon className="mr-0 sm:mr-2 h-4 w-4" />
					<span className="hidden sm:inline">Unduh SaKu App</span>
				</a>
			</div>
		</header>
	);
};

const Hero: React.FC = () => {
	return (
		<section className="px-20 relative min-h-screen flex items-center justify-center overflow-hidden bg-[#101510]">
			<div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-linear-to-r from-[#3ecf8e]/15 to-[#279299]/15 rounded-full blur-3xl opacity-50 animate-pulse-glow" />

			<div className="relative z-10 container mx-auto flex flex-col md:flex-row gap-12 items-center pt-24 pb-12 px-6">
				<div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-1">
					<div className="font-inter font-medium text-base md:text-lg px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-gray-700/50 text-gray-200 mb-8 transform -rotate-1">
						#diSakuinAja
					</div>

					<h1 className="font-space-grotesk font-bold text-3xl md:text-5xl text-white leading-tight mb-6 tracking-tighter">
						SaKu -{" "}
						<span className="bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent">
							Sahabat Kuliah
						</span>
					</h1>

					<p className="font-inter text-xl tracking-tighter md:text-2xl text-gray-400 mb-12">
						Layanan{" "}
						<span className="text-white font-medium underline italic underline-offset-2">
							Ojek Online
						</span>{" "}
						dari mahasiswa, oleh mahasiswa, untuk mahasiswa.
					</p>

					<div className="flex flex-col sm:flex-row gap-4">
						<button className="font-inter font-semibold text-lg bg-linear-to-r from-[#3ecf8e] to-[#279299] text-black px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center">
							Mulai Pesan
							<ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
						</button>
						<button className="font-inter font-semibold text-lg bg-gray-800/60 backdrop-blur-md border border-gray-700 text-white px-10 py-4 rounded-full transition-all duration-300 hover:bg-gray-700/80 hover:border-gray-600 flex items-center justify-center">
							Gabung SaKu Driver
							<UserPlus className="w-6 h-6 ml-2" strokeWidth={1.5} />
						</button>
					</div>
				</div>

				<div className="relative hidden md:flex items-center justify-center md:flex-1 h-[500px]">
					<div className="absolute w-[500px] h-[500px] bg-linear-to-r from-[#3ecf8e] to-[#279299] rounded-full blur-3xl opacity-30" />
					<div className="absolute w-[300px] h-[300px] bg-linear-to-r from-[#3ecf8e]/50 to-[#279299]/50 rounded-full blur-2xl opacity-50" />
					<div className="relative font-space-grotesk text-3xl rounded-3xl p-16 backdrop-blur-sm">
						<Image src={HeroPreview} alt="App Screenshot" width={400} height={400} />
					</div>
				</div>
			</div>
		</section>
	);
};

const Features: React.FC = () => {
	const features = [
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 text-[#52c572]"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			),
			title: "Cepat & Tepat Waktu",
			description: "Driver kami sesama mahasiswa yang hafal jalan tikus kampus.",
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 text-[#52c572]"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			),
			title: "Harga Mahasiswa",
			description: "Tarif super hemat yang gak bikin kantong kering di akhir bulan.",
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 text-[#52c572]"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.623-2.13-1.558-2.662a.498.498 0 0 0-.642.336c-.198.663-.36 1.393-.36 2.185v.003M15 19.128a9.37 9.37 0 0 0-2.625.372 9.337 9.337 0 0 0-4.121-.952 4.125 4.125 0 0 0 7.533-2.493M12 3c2.755 0 5.455.232 8.083.678a.75.75 0 0 1 .417.678v3.465a.75.75 0 0 1-.417.678c-2.628.446-5.328.678-8.083.678s-5.455-.232-8.083-.678a.75.75 0 0 1-.417-.678V4.356a.75.75 0 0 1 .417-.678C6.545 3.232 9.245 3 12 3Z"
					/>
				</svg>
			),
			title: "Satu Frekuensi",
			description: "Driver dan penumpang sama-sama anak kuliahan. Aman dan nyambung!",
		},
	];

	return (
		<section id="fitur" className="px-20 py-16 md:py-24 bg-[#121812]">
			<div className="container mx-auto px-6 flex flex-col items-center">
				<h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center text-white mb-12 md:mb-16">
					Kenapa SaKu?
				</h2>

				<div className="flex flex-col md:flex-row gap-8 w-full">
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex-1 bg-[#1A201A] p-8 rounded-2xl border border-gray-800/50 transition-all duration-300 hover:border-[#52c572]/70 transform hover:-translate-y-2"
						>
							<div className="mb-4">{feature.icon}</div>
							<h3 className="font-space-grotesk text-2xl font-semibold text-white mb-3">
								{feature.title}
							</h3>
							<p className="font-inter text-gray-400">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

const LocationInfo: React.FC = () => {
	return (
		<section
			id="lokasi"
			className="px-20 py-16 md:py-24 bg-[#121812] border-t border-b border-gray-800/50"
		>
			<div className="container mx-auto px-6 flex flex-col items-center">
				<h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center text-white mb-6">
					Area Operasi Kami
				</h2>
				<p className="font-inter text-xl text-gray-400 text-center mb-10 mx-auto">
					Sebagai layanan ojek online{" "}
					<span className="text-white font-medium">dari</span> dan{" "}
					<span className="text-white font-medium">untuk</span> mahasiswa, saat
					ini kami baru memfokuskan layanan di:
				</p>

				<div className="flex flex-col items-center gap-12 w-full">
					<div className="bg-[#1A201A] border border-gray-700/50 rounded-2xl p-8 overflow-hidden w-full">
						<div className="flex flex-col md:flex-row items-center justify-between gap-6">
							<div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-r from-[#3ecf8e]/20 to-[#279299]/20 flex items-center justify-center border-2 border-[#3ecf8e]/50 backdrop-blur-sm">
								<MapPin
									className="w-10 h-10 md:w-12 md:h-12 text-[#3ecf8e]"
									strokeWidth={1.5}
								/>
							</div>

							<div className="grow text-center md:text-left md:pl-1">
								<h3 className="font-space-grotesk text-3xl md:text-4xl font-bold bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent">
									UIN Suska Riau
								</h3>
								<p className="font-inter text-gray-300 text-lg mt-2">
									(dan area strategis sekitarnya)
								</p>
							</div>
						</div>
					</div>

					<div className="bg-gray-800/30 border border-gray-700/60 rounded-xl p-6 flex items-center justify-center md:justify-start gap-5">
						<div className="shrink-0">
							<Rocket className="w-6 h-6 text-[#52c572]" />
						</div>
						<p className="font-inter text-base md:text-lg text-gray-400 text-left">
							<span className="font-medium text-gray-200">
								Gak sabar pengen ada di-Kampusmu?
							</span>{" "}
							Nantikan kehadiran kami segera yak!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

const PwaInstallGuide: React.FC = () => {
	const steps = [
		{
			icon: <AppWindow className="w-8 h-8 text-[#52c572]" strokeWidth={1.5} />,
			title: "1. Buka di Browser",
			description:
				"Buka website SaKu (saku.app) di browser HP-mu (Chrome, Safari, dll).",
		},
		{
			icon: <Share className="w-8 h-8 text-[#52c572]" strokeWidth={1.5} />,
			title: "2. Cari Tombol Opsi",
			description:
				"Klik tombol 'Share' [↑] (di iOS) atau menu 'Opsi' ︙ (di Android).",
		},
		{
			icon: <SquarePlus className="w-8 h-8 text-[#52c572]" strokeWidth={1.5} />,
			title: "3. Add to Home Screen",
			description:
				"Pilih 'Tambahkan ke Layar Utama' atau 'Install App'. SaKu akan muncul di HP-mu!",
		},
	];

	return (
		<section id="install" className="px-20 py-16 md:py-24 bg-[#101510]">
			<div className="container mx-auto px-6 flex flex-col items-center">
				<h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center text-white mb-6">
					Install SaKu App
				</h2>
				<p className="font-inter text-xl text-gray-400 text-center mb-12 md:mb-16 mx-auto">
					Nikmati kemudahan akses SaKu langsung dari layar HP-mu, tanpa perlu
					download di Play Store atau App Store.
				</p>

				<div className="w-full max-w-2xl">
					<div className="relative flex flex-col gap-16">
						<div className="absolute left-8 top-0 h-[90%] w-px bg-gray-700 hidden md:block" />

						{steps.map((step, index) => (
							<div
								key={index}
								className="relative flex flex-row items-start gap-8"
							>
								<div className="relative z-10 shrink-0 h-16 w-16 bg-[#1A201A] border-2 border-[#52c572] rounded-full flex items-center justify-center">
									{step.icon}
								</div>

								<div className="pt-1">
									<h3 className="font-space-grotesk text-xl md:text-2xl font-semibold text-white mb-3">
										{step.title}
									</h3>
									<p className="font-inter text-gray-400">{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

const ThreadsIcon: React.FC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="w-6 h-6"
	>
		<path d="M12 9a4 4 0 1 0 0 6 4 4 0 0 0 0-6Z" />
		<path d="M12 15c-6.627 0-10-3.373-10-8s3.373-8 10-8 10 3.373 10 8-3.373 8-10 8Z" />
		<path d="M12 15c-6.627 0-10 3.373-10 8s3.373 8 10 8 10-3.373 10-8-3.373-8-10-8Z" />
	</svg>
);

const TiktokIcon: React.FC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="w-6 h-6"
	>
		<path d="M21 7.5a1 1 0 0 1-1-1v-2.5a1 1 0 0 0-1-1H16.5a1 1 0 0 0-1 1v10.5a2.5 2.5 0 1 1-5 0V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5.5a5.5 5.5 0 1 0 11 0v-5.5a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-1 1V7.5a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1Z" />
	</svg>
);

const Footer: React.FC = () => {
	return (
		<footer className="px-13 py-5 bg-[#101510] border-t border-gray-800/50">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row gap-12 mb-12 md:mb-16 justify-between items-center md:items-start">
					<div className="text-center md:text-left">
						<div className="flex justify-center md:justify-start items-center h-full gap-3 font-space-grotesk text-3xl font-bold bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent mb-5">
							<Image
								className="rounded-md"
								src={SakuLogo}
								alt="Logo SaKu"
								width={45}
								height={45}
							/>
							<span>
								saku
								<span className="italic font-medium text-gray-400">.click</span>
							</span>
						</div>
						<p className="font-inter text-gray-500 mx-auto md:mx-0 max-w-sm">
							#diSakuinAja - Layanan ojek online dari mahasiswa, oleh mahasiswa,
							untuk mahasiswa.
						</p>
					</div>

					<div className="text-center md:text-right">
						<div className="flex space-x-6 justify-center md:justify-end items-center h-full">
							<a
								href="#"
								aria-label="Instagram"
								className="text-gray-500 hover:text-white transition-colors duration-200"
							>
								<Instagram className="w-6 h-6" />
							</a>
							<a
								href="#"
								aria-label="Twitter"
								className="text-gray-500 hover:text-white transition-colors duration-200"
							>
								<Twitter className="w-6 h-6" />
							</a>
							<a
								href="#"
								aria-label="Threads"
								className="text-gray-500 hover:text-white transition-colors duration-200"
							>
								<ThreadsIcon />
							</a>
							<a
								href="#"
								aria-label="TikTok"
								className="text-gray-500 hover:text-white transition-colors duration-200"
							>
								<TiktokIcon />
							</a>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-800/50 pt-10 text-center">
					<p className="font-inter text-gray-500">
						© {new Date().getFullYear()} Sahabat Kuliah (SaKu). Dibuat dengan ❤️
						di Pekanbaru.
					</p>
				</div>
			</div>
		</footer>
	);
};

const Home: React.FC = () => {
	return (
		<div className="bg-[#101510] text-white font-inter min-h-screen flex flex-col">
			<Header />
			<main className="grow">
				<Hero />
				<Features />
				<LocationInfo />
				<PwaInstallGuide />
			</main>
			<Footer />
		</div>
	);
};

export default Home;