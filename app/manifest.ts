import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "SaKu - Sahabat Kuliah",
		short_name: "SaKu",
		description: "  Layanan ojek online dari mahasiswa, oleh mahasiswa, untuk mahasiswa.",
		start_url: "/",
		display: "standalone",
		background_color: "#101510",
		theme_color: "#52c572",
		icons: [
			{
				src: "/globals/saku-logo-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/globals/saku-logo-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
