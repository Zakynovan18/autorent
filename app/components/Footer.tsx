import { Car, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-5 py-8 pb-24">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-3">
        <Car className="text-yellow-400 w-6 h-6" />
        <span className="text-xl font-bold">RentalKu</span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        Layanan sewa mobil terpercaya dengan armada lengkap dan harga terjangkau.
      </p>

      {/* Info Kontak */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>Jl. Raya No. 123, Kota Malang</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>+62 813-5871-4035</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>RentalKu@email.com</span>
        </div>
      </div>

      {/* Sosmed */}
      <div className="flex items-center gap-3 mb-6">
        <a href="https://www.instagram.com/zakynovannd_?igsh=MWp0NGowNTBoeXo1eg==" target="_blank"
          className="bg-gray-800 hover:bg-yellow-400 px-4 py-2 rounded-xl text-sm font-medium transition">
          Instagram
        </a>
        <a href="https://www.facebook.com/share/1CT2PKY5LK/" target="_blank"
          className="bg-gray-800 hover:bg-yellow-400 px-4 py-2 rounded-xl text-sm font-medium transition">
          Facebook
        </a>
        <a href="https://wa.me/6281358714035" target="_blank"
          className="bg-gray-800 hover:bg-yellow-400 px-4 py-2 rounded-xl text-sm font-medium transition">
          WhatsApp
        </a>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 pt-4">
        <p className="text-xs text-gray-500 text-center">
          © 2026 RentalKu. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}