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
    Loader, 
    Star, 
    Phone, 
    ChevronRight, // <-- Ikon untuk slider
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

      /* Styling untuk Slider Button */
      .slider-thumb-shadow {
        box-shadow: 0 4px 15px rgba(82, 197, 114, 0.4);
      }
      .slider-track-text {
        /* Gradien teks untuk "Geser" */
        background: linear-gradient(to right, #101510 20%, #4a5568 50%, #101510 80%);
        background-size: 200% auto;
        color: #000;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 2s linear infinite;
      }
      @keyframes shine {
        to {
          background-position: -200% center;
        }
      }
    `}
    </style>
);


/**
 * Komponen Peta Leaflet (VERSI DRIVER)
 * Menerima startCoords dan endCoords untuk menggambar rute
 */
const DriverMapComponent: React.FC<{
    scriptLoaded: boolean;
    startCoords: any; // Titik awal rute (bisa lokasi driver atau customer)
    endCoords: any;   // Titik akhir rute (bisa lokasi customer atau tujuan)
}> = ({
    scriptLoaded,
    startCoords,
    endCoords,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const startMarkerRef = useRef<any>(null); // Ganti nama
    const endMarkerRef = useRef<any>(null); // Ganti nama
    const routingControlRef = useRef<any>(null);

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

    }, [scriptLoaded]);

    // Efek untuk menggambar/update marker (versi simple)
    useEffect(() => {
        if (!mapInstance.current || !(window as any).L || !scriptLoaded) return;

        // --- Handle Start Marker ---
        if (startCoords) {
            if (startMarkerRef.current) {
                startMarkerRef.current.setLatLng(startCoords);
            } else {
                startMarkerRef.current = (window as any).L.marker(startCoords, {})
                    .addTo(mapInstance.current);
            }
        } else if (startMarkerRef.current) {
            mapInstance.current.removeLayer(startMarkerRef.current);
            startMarkerRef.current = null;
        }

        // --- Handle End Marker ---
        if (endCoords) {
            if (endMarkerRef.current) {
                endMarkerRef.current.setLatLng(endCoords);
            } else {
                endMarkerRef.current = (window as any).L.marker(
                    endCoords,
                    {}
                )
                    .addTo(mapInstance.current);
            }
        } else if (endMarkerRef.current) {
            mapInstance.current.removeLayer(endMarkerRef.current);
            endMarkerRef.current = null;
        }
    }, [startCoords, endCoords, scriptLoaded]);

    // Efek Menggambar Rute (BARU: menggunakan start/end coords)
    useEffect(() => {
        if (!mapInstance.current || !(window as any).L.Routing || !scriptLoaded)
            return;

        if (
            startCoords &&
            endCoords &&
            (startCoords.lat !== endCoords.lat ||
                startCoords.lng !== endCoords.lng)
        ) {
            if (routingControlRef.current) {
                mapInstance.current.removeControl(routingControlRef.current);
            }

            const routingControl = (window as any).L.Routing.control({
                waypoints: [
                    (window as any).L.latLng(startCoords.lat, startCoords.lng),
                    (window as any).L.latLng(
                        endCoords.lat,
                        endCoords.lng
                    ),
                ],
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true, // Auto zoom ke rute
                show: false,
                createMarker: () => null,
                lineOptions: {
                    styles: [{ color: "#52c572", opacity: 0.8, weight: 6 }],
                },
            })
                .on("routesfound", (e: any) => {
                    if (e.routes && e.routes.length > 0) {
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
    }, [startCoords, endCoords, scriptLoaded]); // <-- Diperbarui

    return <div ref={mapRef} className="h-full w-full bg-gray-200" />;
};


/**
 * Helper component untuk baris info di Modal
 */
const InfoRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    isBold?: boolean;
}> = ({ icon, label, value, isBold = false }) => (
    <div className="flex items-start">
        <div className="shrink-0 w-6 mt-1">{icon}</div>
        <div className="grow">
            <p className="text-xs text-gray-400">{label}</p>
            <p className={`text-white ${isBold ? 'font-bold text-lg' : 'font-medium'}`}>
                {value}
            </p>
        </div>
    </div>
);

/**
 * =======================================================================
 * * KOMPONEN BARU: SlideToConfirmButton
 * =======================================================================
 */
const SlideToConfirmButton: React.FC<{
    text: string;
    onConfirm: () => void;
}> = ({ text, onConfirm }) => {
    const [sliderLeft, setSliderLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [initialMouseX, setInitialMouseX] = useState(0);

    const sliderRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const getMaxLeft = () => {
        if (!sliderRef.current || !thumbRef.current) return 0;
        return sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setInitialMouseX(clientX);
        // Hapus transisi saat menggeser
        if (thumbRef.current) {
            thumbRef.current.style.transition = 'none';
        }
    };

    const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - initialMouseX;
        const maxLeft = getMaxLeft();
        
        const newLeft = Math.max(0, Math.min(deltaX, maxLeft));
        setSliderLeft(newLeft);
    }, [isDragging, initialMouseX]);

    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);

        const maxLeft = getMaxLeft();

        // Tambahkan transisi kembali
        if (thumbRef.current) {
            thumbRef.current.style.transition = 'all 0.3s ease';
        }

        if (sliderLeft >= maxLeft - 5) { // Threshold 5px
            onConfirm();
            // Jaga di ujung
            setSliderLeft(maxLeft);
        } else {
            // Snap kembali ke awal
            setSliderLeft(0);
        }
    }, [isDragging, sliderLeft, onConfirm]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('touchmove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchend', handleDragEnd);
        } else {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    return (
        <div 
            ref={sliderRef}
            className="w-full bg-[#1A201A] border border-gray-700 rounded-full h-16 relative flex items-center justify-center overflow-hidden select-none"
        >
            <span className="slider-track-text font-semibold text-gray-500 z-10">
                {text}
            </span>
            <div
                ref={thumbRef}
                className="w-16 h-16 bg-[#52c572] rounded-full absolute top-0 left-0 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing slider-thumb-shadow transition-all duration-300 ease"
                style={{ left: `${sliderLeft}px` }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
            >
                <ChevronRight className="w-6 h-6 text-black" />
            </div>
        </div>
    );
};


/**
 * Komponen Modal: Orderan Masuk
 * (Diperbarui dengan info customer)
 */
const IncomingOrderModal: React.FC<{
    order: any;
    onAccept: () => void;
    onDecline: () => void;
}> = ({ order, onAccept, onDecline }) => (
    <div className="fixed inset-0 bg-black/50 z-2000 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-[#121812] border border-gray-700 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="font-grotesk text-3xl font-bold text-center text-[#52c572] mb-6">
                Orderan Masuk!
            </h2>

            {/* Info Customer */}
            <div className="flex items-center gap-3 mb-6">
                <img 
                    src={order.customerImageUrl}
                    alt={order.customerName}
                    className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600"
                    onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100/1A201A/FFFFFF?text=C&font=inter';
                        target.onerror = null;
                    }}
                />
                <div>
                    <h4 className="font-bold text-white text-lg">{order.customerName}</h4>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-300 text-sm">{order.customerRating}</span>
                    </div>
                </div>
            </div>

            {/* Info Order */}
            <div className="space-y-3 mb-8">
                <InfoRow 
                    icon={<MapPin className="w-4 h-4 text-green-500" />} 
                    label="Jemput" 
                    value={order.pickupAddress} 
                />
                <InfoRow 
                    icon={<MapPin className="w-4 h-4 text-red-500" />} 
                    label="Tujuan" 
                    value={order.destinationAddress} 
                />
                <InfoRow 
                    icon={<Clock className="w-4 h-4 text-blue-400" />} 
                    label="Jarak" 
                    value={`${order.distance.toFixed(1)} km`} 
                />
                <InfoRow 
                    icon={<DollarSign className="w-4 h-4 text-green-400" />} 
                    label="Bayaran" 
                    value={`Rp ${order.price.toLocaleString("id-ID")}`} 
                    isBold={true} 
                />
            </div>
            
            {/* Tombol Aksi */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={onDecline} 
                    className="w-full font-inter font-semibold text-center text-red-400 bg-red-900/50 py-3 rounded-lg hover:bg-red-900/80 transition"
                >
                    Tolak
                </button>
                <button 
                    onClick={onAccept} 
                    className="w-full font-inter font-semibold text-center text-black bg-[#52c572] py-3 rounded-lg hover:bg-green-400 transition"
                >
                    Ambil Orderan
                </button>
            </div>
        </div>
    </div>
);

/**
 * Komponen Panel: Sedang Dalam Perjalanan
 * (Diperbarui dengan state ON_PICKUP / ON_DELIVERY)
 */
const OnTripPanel: React.FC<{
    state: 'ON_PICKUP' | 'ON_DELIVERY';
    order: any;
    onConfirmPickup: () => void;
    onConfirmDelivery: () => void;
}> = ({ state, order, onConfirmPickup, onConfirmDelivery }) => (
     <div className="fixed bottom-0 left-0 right-0 z-1100 p-4">
        <div className="max-w-xl mx-auto bg-[#121812] border border-gray-700 rounded-2xl shadow-2xl p-6">
            
            {/* Header: Info Customer */}
            <div className="flex items-center gap-4 mb-5">
                <img 
                    src={order.customerImageUrl} 
                    alt={order.customerName}
                    className="w-14 h-14 rounded-full border-2 border-[#52c572] bg-gray-700"
                    onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100/1A201A/FFFFFF?text=C&font=inter';
                        target.onerror = null;
                    }}
                />
                <div className="grow">
                    <h4 className="text-lg font-bold text-white">{order.customerName}</h4>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{order.customerRating}</span>
                    </div>
                </div>
                <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                    <Phone className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Info Rute & Tombol Geser */}
            {state === 'ON_PICKUP' && (
                <div>
                    <h3 className="font-grotesk text-xl font-bold text-white mb-3">
                        Menuju Lokasi Jemput
                    </h3>
                    <InfoRow 
                        icon={<MapPin className="w-4 h-4 text-green-500" />} 
                        label="Jemput" 
                        value={order.pickupAddress} 
                    />
                    <div className="mt-6">
                        <SlideToConfirmButton 
                            text="Geser Setiba di Lokasi"
                            onConfirm={onConfirmPickup}
                        />
                    </div>
                </div>
            )}

            {state === 'ON_DELIVERY' && (
                <div>
                    <h3 className="font-grotesk text-xl font-bold text-white mb-3">
                        Mengantar ke Tujuan
                    </h3>
                    <InfoRow 
                        icon={<MapPin className="w-4 h-4 text-red-500" />} 
                        label="Tujuan" 
                        value={order.destinationAddress} 
                    />
                    <div className="mt-6">
                        <SlideToConfirmButton 
                            text="Geser untuk Selesaikan"
                            onConfirm={onConfirmDelivery}
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
);


/**
 * =======================================================================
 * * APLIKASI DRIVER UTAMA (SEKARANG KOMPONEN APP)
 * =======================================================================
 */
const App: React.FC = () => {
    // State untuk UI Driver (Alur Baru)
    type DriverState = 'IDLE' | 'INCOMING_ORDER' | 'ON_PICKUP' | 'ON_DELIVERY';
    const [driverState, setDriverState] = useState<DriverState>('IDLE');
    const [currentOrder, setCurrentOrder] = useState<any>(null);

    // Lokasi driver (dummy, di UIN)
    const [driverLocation, setDriverLocation] = useState({ 
        lat: 0.466649, 
        lng: 101.357699 
    });

    // State untuk memuat script
    const [scriptLoaded, setScriptLoaded] = useState(false);

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
                // Jika script sudah ada (mungkin dari HMR), tunggu
                const checkInterval = setInterval(() => {
                    if (id === leafletScriptId && (window as any).L) {
                        clearInterval(checkInterval);
                        onLoadCallback();
                    } else if (id === routingScriptId && (window as any).L?.Routing) {
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

        // Muat Leaflet dulu, baru Routing
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
    }, []); // Hanya dijalankan sekali

    // Efek untuk SIMULASI orderan masuk
    useEffect(() => {
        if (driverState === 'IDLE') {
            const timer = setTimeout(() => {
                const dummyOrder = {
                    customerName: "Budi Santoso",
                    customerRating: 4.8,
                    customerImageUrl: "https://placehold.co/100x100/1A201A/FFFFFF?text=BS&font=inter",
                    pickupAddress: "Perpustakaan UIN Suska",
                    destinationAddress: "Mal SKA Pekanbaru",
                    price: 12000,
                    distance: 6.2,
                    pickupCoords: { lat: 0.466649, lng: 101.357699 }, // UIN
                    destinationCoords: { lat: 0.5050, lng: 101.4111 }, // SKA
                };
                setCurrentOrder(dummyOrder);
                setDriverState('INCOMING_ORDER');
                console.log("DRIVER APP: Orderan masuk!");
            }, 5000); // Orderan masuk setelah 5 detik

            return () => clearTimeout(timer); // Bersihkan timer
        }
    }, [driverState]); // Dipicu setiap kali state kembali ke IDLE

    // Handler untuk driver
    const handleAcceptOrder = () => {
        console.log("DRIVER APP: Orderan diterima");
        setDriverState('ON_PICKUP'); // <-- State Baru
    };

    const handleDeclineOrder = () => {
        console.log("DRIVER APP: Orderan ditolak");
        setDriverState('IDLE');
        setCurrentOrder(null);
    };

    const handleArriveAtPickup = () => {
        console.log("DRIVER APP: Tiba di lokasi jemput");
        setDriverState('ON_DELIVERY'); // <-- State Baru
    };

    const handleCompleteTrip = () => {
        console.log("DRIVER APP: Perjalanan Selesai");
        setDriverState('IDLE');
        setCurrentOrder(null);
    };

    // Logika untuk menentukan koordinat Peta
    const getMapCoordinates = () => {
        if (!currentOrder) return { start: null, end: null };

        if (driverState === 'ON_PICKUP') {
            // Rute: Driver -> Customer
            return {
                start: driverLocation,
                end: currentOrder.pickupCoords
            };
        }
        if (driverState === 'ON_DELIVERY') {
            // Rute: Customer -> Tujuan
            return {
                start: currentOrder.pickupCoords,
                end: currentOrder.destinationCoords
            };
        }
        return { start: null, end: null }; // IDLE atau INCOMING
    };

    const { start: mapStart, end: mapEnd } = getMapCoordinates();

    return (
        // Hapus toggle, App ini adalah Driver App
        <>
            <StyleInjector />
            <div className="bg-[#101510] text-white font-inter min-h-screen relative">
                {/* Peta Driver (Selalu tampil) */}
                <div className="w-full h-screen z-10">
                    <DriverMapComponent
                        scriptLoaded={scriptLoaded}
                        startCoords={mapStart}
                        endCoords={mapEnd}
                    />
                </div>

                {/* Status IDLE */}
                {driverState === 'IDLE' && (
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-1100 px-4 w-full max-w-md">
                        <div className="bg-white text-black p-4 rounded-lg shadow-lg">
                            <p className="font-semibold text-center">Menunggu orderan...</p>
                        </div>
                    </div>
                )}

                {/* Modal Orderan Masuk */}
                {driverState === 'INCOMING_ORDER' && currentOrder && (
                    <IncomingOrderModal
                        order={currentOrder}
                        onAccept={handleAcceptOrder}
                        onDecline={handleDeclineOrder}
                    />
                )}

                {/* Panel Sedang di Jalan (ON_PICKUP atau ON_DELIVERY) */}
                {(driverState === 'ON_PICKUP' || driverState === 'ON_DELIVERY') && currentOrder && (
                    <OnTripPanel
                        state={driverState}
                        order={currentOrder}
                        onConfirmPickup={handleArriveAtPickup}
                        onConfirmDelivery={handleCompleteTrip}
                    />
                )}
            </div>
        </>
    );
};


export default App;