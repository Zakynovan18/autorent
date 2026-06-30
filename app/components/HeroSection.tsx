export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white px-6 pt-16 pb-10 overflow-hidden min-h-65 flex items-end">
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 to-gray-900/40 z-10" />
      <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-600" />
      <div className="relative z-20">
        <h1 className="text-3xl font-bold leading-tight mb-3">
          Sewa Mobil Impianmu <br /> dengan Mudah
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Nikmati perjalanan tanpa batas dengan <br />
          armada premium dan layanan terbaik kami.
        </p>
      </div>
    </section>
  );
}