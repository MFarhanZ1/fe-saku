import React from "react";
// Menambahkan ikon baru untuk PWA Guide DAN Lokasi, serta media sosial
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
} from "lucide-react";

// Komponen untuk inject font
const StyleInjector: React.FC = () => (
	<style>
		{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
      
      .font-grotesk {
        font-family: 'Space Grotesk', sans-serif;
      }
      
      .font-inter {
        font-family: 'Inter', sans-serif;
      }

      /* Custom animation for pulsating glow */
      @keyframes pulse-glow {
        0%, 100% {
          opacity: 0.3;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.5;
          transform: translate(-50%, -50%) scale(1.05);
        }
      }

      .animate-pulse-glow {
        animation: pulse-glow 4s infinite ease-in-out;
      }

      /* Custom button gradient border (TIDAK DIGUNAKAN LAGI DI HERO, tapi biarkan jika ingin dipakai di tempat lain) */
      .btn-gradient-border {
        position: relative;
        z-index: 0;
      }
      .btn-gradient-border::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 9999px; /* Full rounded */
        padding: 2px; /* Border thickness */
        background: linear-gradient(to right, #3ecf8e, #279299);
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
              mask-composite: exclude;
        z-index: -1;
      }
    `}
	</style>
);

// Komponen Header
const Header: React.FC = () => {
	return (
		// Header dibuat sticky, dengan background glassmorphism
		<header className="sticky top-0 left-0 right-0 z-50 w-full bg-[#101510]/70 backdrop-blur-lg">
			<div className="container mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
				{/* Logo - Dikecilkan sedikit di mobile */}
				<div className="font-grotesk text-2xl md:text-3xl font-bold bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent">
					SaKu
				</div>

				{/* Navigasi - Tetap tersembunyi di mobile */}
				<nav className="hidden md:flex items-center space-x-8 font-inter">
					<a
						href="#fitur"
						className="text-gray-300 hover:text-[#52c572] transition-colors duration-200"
					>
						Fitur
					</a>
					<a
						href="#lokasi"
						className="text-gray-300 hover:text-[#52c572] transition-colors duration-200"
					>
						Lokasi
					</a>
					<a
						href="#install"
						className="text-gray-300 hover:text-[#52c572] transition-colors duration-200"
					>
						Cara Install
					</a>
				</nav>

				{/* Tombol CTA - Padding dikecilkan di mobile */}
				<button className="font-inter font-semibold bg-[#52c572] text-black px-4 py-2 md:px-6 rounded-full hover:opacity-90 transition-opacity duration-200">
					Buka App
				</button>
			</div>
		</header>
	);
};

// Komponen Hero
const Hero: React.FC = () => {
	return (
		<section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#101510]">
			{/* Background Glow Effect */}
			<div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-linear-to-r from-[#3ecf8e]/15 to-[#279299]/15 rounded-full blur-3xl opacity-50 animate-pulse-glow" />

			{/* Layout 2 kolom */}
			<div className="relative z-10 container mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center pt-12 pb-12">
				{/* Kolom Kiri: Teks Konten - Dibuat center di mobile */}
				<div className="flex flex-col items-center text-center md:items-start md:text-left">
					{/* Slogan #diSakuinAja */}
					<div className="font-inter font-medium text-base md:text-lg px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-gray-700/50 text-gray-200 mb-8 transform -rotate-1">
						#diSakuinAja
					</div>

					{/* Judul Utama - Ukuran sudah responsif */}
					<h1 className="font-grotesk font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6 tracking-tighter">
						SaKu -{" "}
						<span className="bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent">
							Sahabat Kuliah
						</span>
					</h1>

					{/* Sub-Slogan - Ukuran sudah responsif */}
					<p className="font-inter text-xl md:text-2xl text-gray-400 max-w-2xl mb-12">
						Solusi Ojek Online dari mahasiswa, oleh mahasiswa, untuk mahasiswa.
					</p>

					{/* Tombol CTA - Layout sudah responsif (flex-col sm:flex-row) */}
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

				{/* Kolom Kanan: Visual Orb - Tetap hidden di mobile */}
				<div className="relative hidden md:flex items-center justify-center h-[500px]">
					{/* Orb visual besar */}
					<div className="absolute w-[500px] h-[500px] bg-linear-to-r from-[#3ecf8e] to-[#279299] rounded-full blur-3xl opacity-30" />
					{/* Orb dalam */}
					<div className="absolute w-[300px] h-[300px] bg-linear-to-r from-[#3ecf8e]/50 to-[#279299]/50 rounded-full blur-2xl opacity-50" />
					{/* Placeholder 'App Screenshot' */}
					<div className="relative font-grotesk text-3xl text-white/50 border-2 border-dashed border-gray-700 rounded-3xl p-16 bg-white/5 backdrop-blur-sm">
						[ App Preview ]
					</div>
				</div>
			</div>
		</section>
	);
};

// Komponen Fitur
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
			description:
				"Driver kami sesama mahasiswa yang hafal jalan tikus kampus.",
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
			description:
				"Tarif super hemat yang gak bikin kantong kering di akhir bulan.",
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
			description:
				"Driver dan penumpang sama-sama anak kuliahan. Aman dan nyambung!",
		},
	];

	return (
		<section id="fitur" className="py-16 md:py-24 bg-[#121812]">
			<div className="container mx-auto max-w-7xl px-6">
				<h2 className="font-grotesk text-4xl md:text-5xl font-bold text-center text-white mb-12 md:mb-16">
					Kenapa SaKu?
				</h2>

				{/* Grid - Sudah responsif (stack di mobile) */}
				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-[#1A201A] p-8 rounded-2xl border border-gray-800/50 transition-all duration-300 hover:border-[#52c572]/70 transform hover:-translate-y-2"
						>
							<div className="mb-4">{feature.icon}</div>
							<h3 className="font-grotesk text-2xl font-semibold text-white mb-3">
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

// Komponen Baru: Info Lokasi
const LocationInfo: React.FC = () => {
	return (
		<section
			id="lokasi"
			className="py-16 md:py-24 bg-[#121812] border-t border-b border-gray-800/50"
		>
			<div className="container mx-auto max-w-4xl px-6 text-center">
				<h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-6">
					Area Operasi Kami
				</h2>
				<p className="font-inter text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
					Sebagai layanan ojek online{" "}
					<span className="text-white font-medium">dari</span> dan{" "}
					<span className="text-white font-medium">untuk</span> mahasiswa, saat
					ini kami memfokuskan layanan di:
				</p>

				{/* --- KARTU LOKASI (UI BARU) --- */}
				<div className="bg-[#1A201A] border border-gray-700/50 rounded-2xl p-8 overflow-hidden">
					{/* Layout sudah responsif (stack di mobile) */}
					<div className="flex flex-col md:flex-row items-center justify-between gap-8">
						{/* Ikon / Visual - Dikecilkan di mobile */}
						<div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-r from-[#3ecf8e]/20 to-[#279299]/20 flex items-center justify-center border-2 border-[#3ecf8e]/50 backdrop-blur-sm">
							<MapPin
								className="w-10 h-10 md:w-12 md:h-12 text-[#3ecf8e]"
								strokeWidth={1.5}
							/>
						</div>

						{/* Teks Info - Sudah responsif (text-center md:text-left) */}
						<div className="grow text-center md:text-left md:pl-4">
							<h3 className="font-grotesk text-3xl md:text-4xl font-bold bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent">
								UIN Suska Riau
							</h3>
							<p className="font-inter text-gray-300 text-lg mt-2">
								(dan area strategis sekitarnya)
							</p>
						</div>
					</div>
				</div>
				{/* --- AKHIR KARTU LOKASI --- */}

				{/* --- KARTU PENGUMUMAN (UI BARU) --- */}
				<div className="mt-12 bg-gray-800/30 border border-gray-700/60 rounded-xl p-6 flex items-center justify-center md:justify-start gap-5 max-w-2xl mx-auto">
					<div className="shrink-0">
						<Rocket className="w-6 h-6 text-[#52c572]" />
					</div>
					{/* Teks dikecilkan di mobile */}
					<p className="font-inter text-base md:text-lg text-gray-400 text-left">
						<span className="font-medium text-gray-200">
							Kampusmu selanjutnya?
						</span>{" "}
						Nantikan kehadiran kami segera!
					</p>
				</div>
				{/* --- AKHIR KARTU PENGUMUMAN --- */}
			</div>
		</section>
	);
};

// Komponen PWA Install Guide
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
		<section id="install" className="py-16 md:py-24 bg-[#101510]">
			<div className="container mx-auto max-w-7xl px-6">
				<h2 className="font-grotesk text-4xl md:text-5xl font-bold text-center text-white mb-6">
					Install SaKu PWA
				</h2>
				<p className="font-inter text-xl text-gray-400 text-center mb-12 md:mb-16 max-w-2xl mx-auto">
					Nikmati kemudahan akses SaKu langsung dari layar HP-mu, tanpa perlu
					download di App Store.
				</p>

				{/* --- UI VERTICAL TIMELINE --- */}
				<div className="max-w-2xl mx-auto">
					<div className="relative space-y-16">
						{/* Garis vertikal di belakang - hidden di mobile (sudah benar) */}
						<div className="absolute left-8 top-0 h-full w-px bg-gray-700 hidden md:block" />

						{steps.map((step, index) => (
							<div key={index} className="relative flex items-start">
								{/* Gelembung Ikon */}
								<div className="relative z-10 shrink-0 h-16 w-16 bg-[#1A201A] border-2 border-[#52c572] rounded-full flex items-center justify-center">
									{step.icon}
								</div>

								{/* Konten Teks */}
								<div className="ml-8 pt-1">
									{/* Judul step dikecilkan di mobile */}
									<h3 className="font-grotesk text-xl md:text-2xl font-semibold text-white mb-3">
										{step.title}
									</h3>
									<p className="font-inter text-gray-400">{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* --- AKHIR UI TIMELINE --- */}
			</div>
		</section>
	);
};

// Komponen Ikon SVG kustom untuk Threads
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

// Komponen Ikon SVG kustom untuk Tiktok
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

// Komponen Footer (REVISI - Layout 2 kolom, tanpa "Layanan" dan tanpa title "Media Sosial")
const Footer: React.FC = () => {
	return (
		<footer className="py-16 md:py-20 bg-[#101510] border-t border-gray-800/50">
			<div className="container mx-auto max-w-7xl px-6">
				{/* Konten Atas: Grid - Sudah responsif (stack di mobile) */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 md:mb-16">
					{/* Kolom 1: Logo & Slogan - Dibuat center di mobile */}
					<div className="sm:col-span-1 text-center md:text-left">
						<div className="font-grotesk text-3xl font-bold bg-linear-to-r from-[#3ecf8e] to-[#279299] bg-clip-text text-transparent mb-5">
							SaKu
						</div>
						<p className="font-inter text-gray-500 max-w-md mx-auto md:mx-0">
							#diSakuinAja - Solusi ojek online dari mahasiswa, oleh mahasiswa,
							untuk mahasiswa.
						</p>
					</div>

					{/* Kolom 2: Navigasi Layanan (DIHAPUS) */}
					{/* <div> ... </div> */}

					{/* Kolom 2: Media Sosial (Hanya Ikon, Pojok Kanan, tanpa title) */}
					<div className="sm:text-left md:text-right">
						{/* Teks "Media Sosial" DIHAPUS */}

						{/* Dibuat rata tengah di mobile, rata kanan di desktop */}
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
				</div>{" "}
				{/* Akhir Grid */}
				{/* Garis Pemisah & Copyright */}
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

// Komponen App Utama
const Home: React.FC = () => {
	return (
		<div className="bg-[#101510] text-white font-inter min-h-screen">
			<StyleInjector />
			<Header />
			<main>
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
