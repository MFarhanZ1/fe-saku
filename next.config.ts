import type { NextConfig } from "next";
import withPWA from "next-pwa";
import type { PWAConfig } from "next-pwa"; // Impor tipe untuk PWAConfig

// --- Konfigurasi PWA Dimulai ---
const pwaConfig: PWAConfig = {
  /**
   * Folder tujuan service worker.
   * Ini akan menghasilkan file seperti 'sw.js' di dalam folder 'public'.
   */
  dest: 'public',
  
  /**
   * 'register: true' akan otomatis mendaftarkan service worker 
   * di browser client.
   */
  register: true,
  
  /**
   * 'skipWaiting: true' akan membuat service worker baru 
   * langsung aktif setelah instalasi tanpa menunggu.
   */
  skipWaiting: true,
  
  /**
   * PENTING: Nonaktifkan PWA saat mode 'development'.
   * Ini agar 'hot-reloading' (saat Anda coding) tidak terganggu
   * oleh 'caching' dari service worker.
   */
  disable: process.env.NODE_ENV === 'development',
};
// --- Konfigurasi PWA Selesai ---


// --- Konfigurasi Next.js Anda ---
const nextConfig: NextConfig = {
  /* Opsi konfigurasi Next.js Anda yang lain */
  output: "standalone",
  // ...mungkin ada konfigurasi lain seperti 'images', 'reactStrictMode', dll.
};


// --- Ekspor Gabungan ---
// Kita "bungkus" nextConfig dengan withPWA(pwaConfig)
export default withPWA(pwaConfig)(nextConfig);