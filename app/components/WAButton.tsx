"use client";

import { usePathname } from "next/navigation";

export default function WAButton() {
  const pathname = usePathname();

  // Sembunyikan di halaman detail mobil, kontak dan admin
  if (pathname.startsWith("/mobil/") || pathname.startsWith("/admin") || pathname.startsWith("/kontak")) return null;

  const handleWA = () => {
    const pesan = `Halo RentalKu! Saya ingin bertanya mengenai layanan sewa mobil.`;
    window.open(`https://wa.me/6281358714035?text=${encodeURIComponent(pesan)}`, "_blank");
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping" />
      <button
        onClick={handleWA}
        className="relative bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-lg transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.843L.057 23.428a.75.75 0 00.921.921l5.585-1.453A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.964-1.358l-.355-.212-3.668.955.974-3.559-.232-.366A9.722 9.722 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
        </svg>
      </button>
    </div>
  );
}