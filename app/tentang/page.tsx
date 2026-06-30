import Navbar from "../components/Navbar";
import { Shield, Clock, ThumbsUp, MapPin } from "lucide-react";

const keunggulan = [
  {
    icon: Shield,
    title: "Terpercaya",
    desc: "Armada terawat dan berlisensi resmi untuk keamanan perjalananmu.",
  },
  {
    icon: Clock,
    title: "Tersedia 24 Jam",
    desc: "Layanan kami siap membantu kapan saja kamu membutuhkan.",
  },
  {
    icon: ThumbsUp,
    title: "Mudah & Cepat",
    desc: "Booking langsung via WhatsApp, tanpa ribet dan antri.",
  },
  {
    icon: MapPin,
    title: "Antar Jemput",
    desc: "Kami siap mengantarkan mobil ke lokasi yang kamu inginkan.",
  },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />

      {/* Hero */}
      <div className="bg-gray-900 text-white px-6 py-12">
        <h1 className="text-3xl font-bold mb-3">Tentang RentalKu</h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Kami hadir untuk memudahkan perjalananmu dengan layanan sewa mobil yang
          profesional, terpercaya, dan terjangkau.
        </p>
      </div>

      {/* Keunggulan */}
      <div className="px-5 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mengapa Memilih Kami?</h2>
        <div className="flex flex-col gap-4">
          {keunggulan.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-start gap-4 transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="bg-yellow-400 p-3 rounded-xl">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visi Misi */}
      <div className="px-5 pb-6">
        <div className="bg-linear-to-br from-gray-900 to-gray-600 rounded-2xl shadow-md p-5">
          <h2 className="text-lg font-bold text-white mb-3">Visi Kami</h2>
          <p className="text-sm text-blue-100 leading-relaxed mb-5">
            Menjadi layanan sewa mobil terbaik dan terpercaya yang memberikan
            kemudahan mobilitas bagi setiap pelanggan.
          </p>
          <h2 className="text-lg font-bold text-white mb-3">Misi Kami</h2>
          <ul className="text-sm text-blue-100 leading-relaxed space-y-2">
            <li>✅ Menyediakan armada berkualitas dengan harga terjangkau</li>
            <li>✅ Memberikan pelayanan ramah dan responsif</li>
            <li>✅ Memastikan keamanan dan kenyamanan setiap perjalanan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}