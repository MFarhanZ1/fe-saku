"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
// Impor ikon dari lucide-react
import {
	MapPin,
	Users,
	Navigation,
	X,
	LocateFixed,
	Clock,
	DollarSign,
} from "lucide-react";

/**
 * Komponen untuk inject font Google (Inter, Space Grotesk)
 * dan CSS Leaflet ke dalam <head>
 */
const StyleInjector: React.FC = () => (
	<style>
		{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
      @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
      /* CSS untuk leaflet-routing-machine */
      @import url('https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css');
      
      .font-grotesk {
        font-family: 'Space Grotesk', sans-serif;
      }
      
      .font-inter {
        font-family: 'Inter', sans-serif;
      }

      /* Kustomisasi style control Leaflet agar sesuai tema light (default) */
      .leaflet-control-locate a {
        font-size: 1.2rem; /* Sesuaikan ukuran ikon SVG jika perlu */
      }
      .leaflet-bar a, .leaflet-bar a:hover {
        border-radius: 4px !important;
      }

      /* Tombol 'x' kustom di dalam popup */
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
      }
      .leaflet-popup-content {
        margin: 13px 24px 13px 20px !important;
        font-family: 'Inter', sans-serif;
      }
      .custom-popup-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .custom-popup-content b {
        font-size: 1.1em;
        font-weight: 600;
        margin-right: 15px;
      }
      .custom-popup-delete-button {
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        font-size: 1.5rem;
        font-weight: 600;
        color: #777;
        cursor: pointer;
        line-height: 1;
      }
      .custom-popup-delete-button:hover {
        color: #000;
      }

      /* Kustomisasi Tampilan Rute */
      /* Sembunyikan panel instruksi routing */
      .leaflet-routing-container {
        display: none !important;
      }
      /* Warnai garis rute agar sesuai tema */
      .leaflet-routing-alt path {
        stroke: #52c572 !important; /* Warna hijau primer */
        stroke-width: 6 !important;
        stroke-opacity: 0.8 !important;
      }
      .leaflet-routing-alt path:hover {
         stroke-opacity: 1 !important;
      }
    `}
	</style>
);

/**
 * Komponen Form (Sidebar Kiri)
 * Menerima state dan setter-nya dari komponen App (DARK MODE)
 */
const OrderForm: React.FC<{
	pickup: string;
	destination: string;
	onClearPickup: () => void;
	onClearDestination: () => void;
}> = ({ pickup, destination, onClearPickup, onClearDestination }) => {
	const [driverGender, setDriverGender] = useState<"any" | "male" | "female">(
		"any"
	);

	return (
		// --- Layout diubah jadi tidak h-full, padding tetap ---
		<div className="p-6 flex flex-col">
			{/* Header Form */}
			<div className="flex-none mb-8">
				<h2 className="font-grotesk text-3xl font-bold text-white">
					Pesan Ojek
				</h2>
				<p className="font-inter text-gray-400">
					Tentukan lokasi jemput dan tujuanmu.
				</p>
			</div>

			{/* Form Fields */}
			<form className="grow space-y-6">
				{/* Pilihan Gender Driver */}
				<div>
					<label className="font-inter font-medium text-gray-300 block mb-2">
						Preferensi Driver
					</label>
					<div className="grid grid-cols-3 gap-2 bg-[#1A201A] border border-gray-700 rounded-lg p-1">
						<button
							type="button"
							onClick={() => setDriverGender("any")}
							className={`font-inter text-sm py-3 px-2 rounded-md transition ${
								driverGender === "any"
									? "bg-[#52c572] text-black font-semibold"
									: "text-gray-400 hover:bg-gray-700"
							}`}
						>
							Bebas
						</button>
						<button
							type="button"
							onClick={() => setDriverGender("male")}
							className={`font-inter text-sm py-3 px-2 rounded-md transition ${
								driverGender === "male"
									? "bg-[#52c572] text-black font-semibold"
									: "text-gray-400 hover:bg-gray-700"
							}`}
						>
							Laki-laki
						</button>
						<button
							type="button"
							onClick={() => setDriverGender("female")}
							className={`font-inter text-sm py-3 px-2 rounded-md transition ${
								driverGender === "female"
									? "bg-[#52c572] text-black font-semibold"
									: "text-gray-400 hover:bg-gray-700"
							}`}
						>
							Perempuan
						</button>
					</div>
				</div>

				{/* Input Lokasi Jemput */}
				<div className="relative">
					<label
						htmlFor="pickup"
						className="font-inter font-medium text-gray-300 mb-2 flex items-center"
					>
						<MapPin className="w-4 h-4 mr-2 text-green-500" />
						Lokasi Jemput
					</label>
					<div className="relative">
						<input
							id="pickup"
							type="text"
							readOnly
							value={pickup}
							placeholder="Klik di peta atau cari lokasi..."
							className="w-full bg-[#1A201A] border border-gray-700 text-white rounded-lg p-4 pl-12 focus:outline-none focus:border-[#52c572] placeholder:text-gray-500"
						/>
						<MapPin className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
						{pickup && (
							<X
								onClick={onClearPickup}
								className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white"
							/>
						)}
					</div>
				</div>

				{/* Input Lokasi Tujuan */}
				<div className="relative">
					<label
						htmlFor="destination"
						className="font-inter font-medium text-gray-300 mb-2 flex items-center"
					>
						<MapPin className="w-4 h-4 mr-2 text-red-500" />
						Lokasi Tujuan
					</label>
					<div className="relative">
						<input
							id="destination"
							type="text"
							readOnly
							value={destination}
							placeholder="Klik di peta atau cari lokasi..."
							className="w-full bg-[#1A201A] border border-gray-700 text-white rounded-lg p-4 pl-12 focus:outline-none focus:border-[#52c572] placeholder:text-gray-500"
						/>
						<MapPin className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
						{destination && (
							<X
								onClick={onClearDestination}
								className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white"
							/>
						)}
					</div>
				</div>
			</form>

			{/* --- Tombol CTA Dihapus dari sini --- */}
		</div>
	);
};

/**
 * Komponen Peta Leaflet (Kanan)
 * (LIGHT MODE)
 */
const LeafletMap: React.FC<{
	scriptLoaded: boolean;
	onMapClick: (latlng: any) => void;
	onLocate: (latlng: any) => void;
	pickupCoords: any;
	destinationCoords: any;
	onClearPickup: () => void;
	onClearDestination: () => void;
	onRouteFound: (km: number) => void;
}> = ({
	scriptLoaded,
	onMapClick,
	onLocate,
	pickupCoords,
	destinationCoords,
	onClearPickup,
	onClearDestination,
	onRouteFound,
}) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstance = useRef<any>(null);
	const pickupMarkerRef = useRef<any>(null);
	const destinationMarkerRef = useRef<any>(null);
	const routingControlRef = useRef<any>(null);

	// Gunakan ref untuk menyimpan callback terbaru (menghindari stale closure)
	const onMapClickRef = useRef(onMapClick);
	const onClearPickupRef = useRef(onClearPickup);
	const onClearDestinationRef = useRef(onClearDestination);
	const onRouteFoundRef = useRef(onRouteFound);

	useEffect(() => {
		onMapClickRef.current = onMapClick;
		onClearPickupRef.current = onClearPickup;
		onClearDestinationRef.current = onClearDestination;
		onRouteFoundRef.current = onRouteFound;
	}, [onMapClick, onClearPickup, onClearDestination, onRouteFound]);

	// Efek untuk inisialisasi map (hanya jalan sekali)
	useEffect(() => {
		if (
			!scriptLoaded ||
			!mapRef.current ||
			!(window as any).L ||
			mapInstance.current
		) {
			return;
		}

		// Set View ke koordinat baru UIN Suska
		const map = (window as any as any).L.map(mapRef.current).setView(
			[0.46664927024151825, 101.3576994],
			15
		);
		mapInstance.current = map;

		(window as any).L.tileLayer(
			"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				maxZoom: 19,
			}
		).addTo(map);

		map.on("click", (e: any) => {
			onMapClickRef.current(e.latlng);
		});

		// Kontrol Kustom untuk "Locate Me"
		const LocateControl = (window as any).L.Control.extend({
			options: {
				position: "bottomright",
			},
			onAdd: function (map: any) {
				const container = (window as any).L.DomUtil.create(
					"div",
					"leaflet-control-locate leaflet-bar leaflet-control"
				);
				const link = (window as any).L.DomUtil.create(
					"a",
					"leaflet-control-locate-button",
					container
				);
				link.href = "#";
				link.title = "Lokasi Saya";
				link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
				link.style.backgroundColor = "white";

				(window as any).L.DomEvent.on(
					link,
					"click",
					(window as any).L.DomEvent.stop
				).on(link, "click", () => {
					map.locate({ setView: true, maxZoom: 16 });
				});
				return container;
			},
		});
		map.addControl(new LocateControl());

		map.on("locationfound", (e: any) => {
			onLocate(e.latlng);
		});
		map.on("locationerror", (e: any) => {
			console.warn("Tidak bisa menemukan lokasimu: " + e.message);
		});
	}, [scriptLoaded, onLocate]);

	// Efek untuk menggambar/update marker (setiap state coords berubah)
	useEffect(() => {
		if (!mapInstance.current || !(window as any).L || !scriptLoaded) return;

		// Konten HTML Kustom Popup Jemput
		const pickupPopupContent = `
      <div class="custom-popup-content">
        <b>Lokasi Jemput</b>
        <button id="delete-pickup-btn" class="custom-popup-delete-button" title="Hapus Pin">&times;</button>
      </div>
    `;

		// --- Handle Pickup Marker ---
		if (pickupCoords) {
			if (pickupMarkerRef.current) {
				pickupMarkerRef.current.setLatLng(pickupCoords);
			} else {
				pickupMarkerRef.current = (window as any).L.marker(pickupCoords, {})
					.addTo(mapInstance.current)
					.bindPopup(pickupPopupContent, { closeButton: false }) // Hapus 'x' default
					.on("popupopen", () => {
						// Tambah listener ke tombol kustom kita SAAT popup terbuka
						const btn = document.getElementById("delete-pickup-btn");
						if (btn) {
							btn.onclick = () => onClearPickupRef.current();
						}
					});
				pickupMarkerRef.current.openPopup();
			}
		} else if (pickupMarkerRef.current) {
			mapInstance.current.removeLayer(pickupMarkerRef.current);
			pickupMarkerRef.current = null;
		}

		// Konten HTML Kustom Popup Tujuan
		const destPopupContent = `
      <div class="custom-popup-content">
        <b>Lokasi Tujuan</b>
        <button id="delete-dest-btn" class="custom-popup-delete-button" title="Hapus Pin">&times;</button>
      </div>
    `;

		// --- Handle Destination Marker ---
		if (destinationCoords) {
			if (destinationMarkerRef.current) {
				destinationMarkerRef.current.setLatLng(destinationCoords);
			} else {
				destinationMarkerRef.current = (window as any).L.marker(
					destinationCoords,
					{}
				)
					.addTo(mapInstance.current)
					.bindPopup(destPopupContent, { closeButton: false }) // Hapus 'x' default
					.on("popupopen", () => {
						// Tambah listener ke tombol kustom kita SAAT popup terbuka
						const btn = document.getElementById("delete-dest-btn");
						if (btn) {
							btn.onclick = () => onClearDestinationRef.current();
						}
					});
				destinationMarkerRef.current.openPopup();
			}
		} else if (destinationMarkerRef.current) {
			mapInstance.current.removeLayer(destinationMarkerRef.current);
			destinationMarkerRef.current = null;
		}
	}, [pickupCoords, destinationCoords, scriptLoaded]);

	// Efek Menggambar Rute
	useEffect(() => {
		if (!mapInstance.current || !(window as any).L.Routing || !scriptLoaded)
			return;

		if (
			pickupCoords &&
			destinationCoords &&
			(pickupCoords.lat !== destinationCoords.lat ||
				pickupCoords.lng !== destinationCoords.lng)
		) {
			if (routingControlRef.current) {
				mapInstance.current.removeControl(routingControlRef.current);
			}

			const routingControl = (window as any).L.Routing.control({
				waypoints: [
					(window as any).L.latLng(pickupCoords.lat, pickupCoords.lng),
					(window as any).L.latLng(
						destinationCoords.lat,
						destinationCoords.lng
					),
				],
				routeWhileDragging: false,
				addWaypoints: false,
				draggableWaypoints: false,
				fitSelectedRoutes: false,
				show: false,
				createMarker: () => null,
				lineOptions: {
					styles: [{ color: "#52c572", opacity: 0.8, weight: 6 }],
				},
			})
				.on("routesfound", (e: any) => {
					if (e.routes && e.routes.length > 0 && e.routes[0].summary) {
						const summary = e.routes[0].summary;
						const distanceKm = summary.totalDistance / 1000;
						onRouteFoundRef.current(distanceKm);

						const bounds = e.routes[0].bounds;
						if (bounds && bounds.getSouthWest() && bounds.getNorthEast()) {
							mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
						}
					}
				})
				.on("routingerror", (e: any) => {
					console.error("Leaflet Routing Error:", e.error);
					if (routingControlRef.current) {
						mapInstance.current.removeControl(routingControlRef.current);
						routingControlRef.current = null;
					}
				})
				.addTo(mapInstance.current);

			routingControlRef.current = routingControl;
		} else if (routingControlRef.current) {
			// Hapus rute
			mapInstance.current.removeControl(routingControlRef.current);
			routingControlRef.current = null;
		}
	}, [pickupCoords, destinationCoords, scriptLoaded]);

	return <div ref={mapRef} className="h-full w-full bg-gray-200" />;
};

/**
 * --- Komponen EstimationBar ---
 */
const EstimationBar: React.FC<{
	isOpen: boolean;
	distance: number;
	price: number;
}> = ({ isOpen, distance, price }) => {
	// Transisi untuk muncul/hilang
	const barClass = isOpen
		? "opacity-100 translate-y-0"
		: "opacity-0 -translate-y-full pointer-events-none"; // Tambah pointer-events-none

	return (
		// z-index dinaikkan (1000 -> 1100)
		<div
			className={`fixed top-6 left-1/2 -translate-x-1/2 z-1100 w-full max-w-lg transition-all duration-300 ease-in-out ${barClass} px-4`}
		>
			<div className="flex items-center justify-between gap-4 bg-[#1A201A]/80 backdrop-blur-md border border-gray-700 rounded-full shadow-xl p-3 pl-6">
				{/* Info Jarak & Harga */}
				<div className="flex items-center divide-x divide-gray-700">
					<div className="flex items-center pr-4">
						<Clock className="w-4 h-4 mr-2 text-[#52c572]" />
						<span className="font-inter text-sm text-gray-300">
							{distance.toFixed(1)} km
						</span>
					</div>
					<div className="flex items-center pl-4">
						<DollarSign className="w-4 h-4 mr-2 text-[#52c572]" />
						<span className="font-grotesk text-lg font-bold text-white">
							Rp {price.toLocaleString("id-ID")},-
						</span>
					</div>
				</div>

				{/* Tombol Aksi */}
				<button className="font-inter font-semibold text-black bg-linear-to-r from-[#3ecf8e] to-[#279299] px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center text-sm">
					Cari Driver
					<Navigation className="w-4 h-4 ml-2" strokeWidth={2.5} />
				</button>
			</div>
		</div>
	);
};

/**
 * Komponen App Utama (Induk)
 * Mengelola state dan logika utama
 */
const App: React.FC = () => {
	const [scriptLoaded, setScriptLoaded] = useState(false);

	// State ditarik ke atas (lifted state)
	const [pickupCoords, setPickupCoords] = useState<any>(null);
	const [destinationCoords, setDestinationCoords] = useState<any>(null);
	const [pickupAddress, setPickupAddress] = useState("");
	const [destinationAddress, setDestinationAddress] = useState("");

	// State untuk Bar Estimasi
	const [distance, setDistance] = useState(0);
	const [price, setPrice] = useState(0);
	const [isBarOpen, setIsBarOpen] = useState(false);

	// Efek Memuat Script Leaflet DAN Routing
	useEffect(() => {
		const leafletScriptId = "leaflet-script";
		const routingScriptId = "leaflet-routing-script";

		if ((window as any).L && (window as any).L.Routing) {
			setScriptLoaded(true);
			return;
		}

		const loadScript = (
			id: string,
			src: string,
			onLoadCallback: () => void
		) => {
			if (document.getElementById(id)) {
				const checkInterval = setInterval(() => {
					if (
						id === leafletScriptId &&
						(window as any).L &&
						typeof (window as any).L.map === "function"
					) {
						clearInterval(checkInterval);
						onLoadCallback();
					} else if (
						id === routingScriptId &&
						(window as any).L &&
						(window as any).L.Routing
					) {
						clearInterval(checkInterval);
						onLoadCallback();
					}
				}, 100);
				return;
			}

			const script = document.createElement("script");
			script.id = id;
			script.src = src;
			script.async = true;
			script.onload = onLoadCallback;
			script.onerror = () => console.error(`Gagal memuat script: ${src}`);
			document.body.appendChild(script);
		};

		loadScript(
			leafletScriptId,
			"https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
			() => {
				loadScript(
					routingScriptId,
					"https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js",
					() => {
						setScriptLoaded(true);
					}
				);
			}
		);

		return () => {
			const lScript = document.getElementById(leafletScriptId);
			const rScript = document.getElementById(routingScriptId);
			if (lScript && lScript.parentElement)
				lScript.parentElement.removeChild(lScript);
			if (rScript && rScript.parentElement)
				rScript.parentElement.removeChild(rScript);
		};
	}, []);

	// Kalkulator Harga
	const calculatePrice = (km: number) => {
		if (km <= 2.2) return 6000;
		if (km <= 3.0) return 7000;
		if (km <= 4.0) return 8000;
		if (km <= 4.5) return 9000;
		if (km <= 5.0) return 10000;
		if (km <= 5.5) return 11000;
		if (km <= 6.0) return 12000;
		if (km <= 6.5) return 13000;
		if (km <= 7.0) return 14000;
		if (km <= 7.5) return 15000;
		if (km <= 8.0) return 16000;
		if (km <= 8.5) return 17000;
		if (km <= 9.0) return 18000;
		if (km <= 9.5) return 19000;
		if (km <= 10.0) return 20000;
		if (km <= 11.0) return 24000;
		if (km <= 12.0) return 26000;
		if (km <= 13.0) return 28000;
		if (km <= 14.0) return 30000;
		if (km <= 15.0) return 32000;
		if (km <= 16.0) return 34000;
		if (km <= 17.0) return 36000;
		if (km <= 18.0) return 38000;
		if (km <= 19.0) return 40000;
		if (km <= 20.0) return 43000;
		if (km <= 21.0) return 45000;
		if (km <= 22.0) return 47000;
		if (km <= 23.0) return 49000;
		if (km <= 24.0) return 51000;
		if (km <= 25.0) return 55000;
		return 55000 + Math.floor(km - 25) * 2000;
	};

	// Callback untuk klik di peta
	const handleMapClick = (latlng: any) => {
		const latLngString = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;

		setIsBarOpen(false); // Selalu sembunyikan bar saat klik map

		if (!pickupCoords) {
			// 1. Klik pertama: Set Pickup
			setPickupCoords(latlng);
			setPickupAddress(latLngString);
			setDestinationCoords(null);
			setDestinationAddress("");
		} else if (!destinationCoords) {
			// 2. Klik kedua: Set Destination
			setDestinationCoords(latlng);
			setDestinationAddress(latLngString);
		} else {
			// 3. Klik ketiga (atau lebih): Reset, jadi Pickup baru
			setPickupCoords(latlng);
			setPickupAddress(latLngString);
			setDestinationCoords(null);
			setDestinationAddress("");
		}
	};

	// Callback untuk tombol 'Locate Me'
	const handleLocate = (latlng: any) => {
		const latLngString = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;

		setIsBarOpen(false); // Sembunyikan bar

		setPickupCoords(latlng);
		setPickupAddress(latLngString);
		setDestinationCoords(null);
		setDestinationAddress("");
	};

	// --- FUNGSI UNTUK MENGHAPUS PIN ---
	const handleClearPickup = () => {
		setIsBarOpen(false); // Sembunyikan bar
		setPickupAddress("");
		setPickupCoords(null);
	};

	const handleClearDestination = () => {
		setIsBarOpen(false); // Sembunyikan bar
		setDestinationAddress("");
		setDestinationCoords(null);
	};

	// Handler untuk Rute Ditemukan
	const handleRouteFound = useCallback((km: number) => {
		const calculatedPrice = calculatePrice(km);
		setDistance(km);
		setPrice(calculatedPrice);
		setIsBarOpen(true); // Tampilkan bar
	}, []); // Deps kosong

	return (
		// --- PERBAIKAN: Layout diubah jadi relative ---
		<div className="bg-[#101510] text-white font-inter min-h-screen relative">
			<StyleInjector />

			{/* --- PERBAIKAN: Wrapper Form diubah jadi absolute z-[1050] --- */}
			<div className="absolute top-1/2 -translate-y-1/2 left-6 z-1050 w-full max-w-sm">
				<div className="bg-[#121812] shadow-lg rounded-2xl overflow-hidden border border-gray-700/50">
					<OrderForm
						pickup={pickupAddress}
						destination={destinationAddress}
						onClearPickup={handleClearPickup}
						onClearDestination={handleClearDestination}
					/>
				</div>
			</div>

			{/* --- PERBAIKAN: Peta diubah jadi w-full h-screen --- */}
			<div className="w-full h-screen z-10">
				<LeafletMap
					scriptLoaded={scriptLoaded}
					onMapClick={handleMapClick}
					onLocate={handleLocate}
					pickupCoords={pickupCoords}
					destinationCoords={destinationCoords}
					onClearPickup={handleClearPickup}
					onClearDestination={handleClearDestination}
					onRouteFound={handleRouteFound}
				/>
			</div>

			{/* Render EstimationBar */}
			<EstimationBar isOpen={isBarOpen} distance={distance} price={price} />
		</div>
	);
};

export default App;
