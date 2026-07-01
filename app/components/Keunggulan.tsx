import { Search, MessageCircle, Car } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Pilih Mobil",
    desc: "Cari dan pilih mobil yang sesuai kebutuhan dan budgetmu.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Hubungi via WA",
    desc: "Klik tombol booking dan langsung chat admin kami di WhatsApp.",
  },
  {
    icon: Car,
    step: "03",
    title: "Nikmati Perjalanan",
    desc: "Mobil siap diantar ke lokasi kamu. Selamat menikmati!",
  },
];

export default function CaraBooking() {
  return (
    <section className="px-5 py-6 bg-gray-900 mx-5 rounded-3xl mb-6">
      <h2 className="text-lg font-bold text-white mb-5">Cara Booking</h2>
      <div className="flex flex-col gap-4">
        {steps.map(({ icon: Icon, step, title, desc }) => (
          <div key={step} className="flex items-start gap-4">
            {/* Step number + icon */}
            <div className="flex flex-col items-center gap-1">
              <div className="bg-yellow-400 p-2.5 rounded-xl">
                <Icon className="w-5 h-5 text-gray-800" />
              </div>
              <span className="text-xs font-bold text-yellow-400">{step}</span>
            </div>
            {/* Text */}
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}