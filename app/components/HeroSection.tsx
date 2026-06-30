"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    title: "Sewa Mobil Impianmu dengan Mudah",
    subtitle: "Nikmati perjalanan tanpa batas dengan armada premium dan layanan terbaik kami.",
    bg: "from-gray-900 to-gray-700",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
  },
  {
    title: "Armada Lengkap untuk Setiap Kebutuhan",
    subtitle: "Dari city car hingga SUV mewah, semua tersedia untuk perjalananmu.",
    bg: "from-blue-900 to-blue-700",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
  },
  {
    title: "Booking Mudah Langsung via WhatsApp",
    subtitle: "Cukup pilih mobil dan hubungi kami, siap antar ke lokasi kamu!",
    bg: "from-yellow-700 to-yellow-500",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden h-72">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className={`absolute inset-0 bg-linear-to-r ${slide.bg} opacity-80`} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8">
            <h1 className="text-2xl font-bold text-white leading-tight mb-2">
              {slide.title}
            </h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${index === current
                ? "bg-yellow-400 w-5 h-2"
                : "bg-white/50 w-2 h-2"
              }`}
          />
        ))}
      </div>
    </section>
  );
}