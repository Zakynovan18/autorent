"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, Users, Settings, Fuel, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Car = {
  id: number;
  nama: string;
  kategori: string;
  tahun: string;
  seats: number;
  transmission: string;
  bahan_bakar: string;
  mesin: string;
  price: number;
  rating: number;
  reviews: number;
  available: boolean;
  image_url: string;
  deskripsi: string;
};

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function DetailMobilPage() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("mobil")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error(error);
        setCar(null);
      } else {
        setCar(data);
      }
      setLoading(false);
    };

    if (id) fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Mobil tidak ditemukan.</p>
      </div>
    );
  }

  const handleBooking = () => {
    const pesan = `Halo AutoRent! Saya ingin booking *${car.nama}* (${car.tahun}) untuk sewa harian. Mohon info ketersediaannya ya. Terima kasih!`;
    window.open(`https://wa.me/6281358714035?text=${encodeURIComponent(pesan)}`, "_blank");
  };

  const specs = [
    { icon: Settings, label: "Transmisi", value: car.transmission },
    { icon: Users, label: "Kapasitas", value: `${car.seats} Kursi` },
    { icon: Fuel, label: "Bahan Bakar", value: car.bahan_bakar },
    { icon: Calendar, label: "Tahun", value: car.tahun },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-48">
      {/* Foto */}
      <div className="relative">
        <img
          src={car.image_url}
          alt={car.nama}
          className="w-full h-64 object-cover"
        />
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Badge Status */}
        <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full shadow border border-gray-800 ${car.available ? "bg-yellow-400 text-gray-800" : "bg-gray-200 text-gray-800"
          }`}>
          {car.available ? "Tersedia" : "Tidak Tersedia"}
        </span>
      </div>

      {/* Info Utama */}
      <div className="bg-white px-5 py-5 shadow-sm">
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-bold text-gray-800">{car.nama}</h1>
        </div>
        <p className="text-sm text-gray-400 mb-3">{car.kategori} • {car.tahun}</p>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-gray-700">{car.rating}</span>
          <span className="text-gray-400 text-sm">({car.reviews} ulasan)</span>
        </div>
      </div>

      {/* Spesifikasi */}
      <div className="px-5 py-5">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Spesifikasi</h2>
        <div className="grid grid-cols-2 gap-3">
          {specs.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center gap-2"
            >
              <Icon className="w-6 h-6 text-yellow-400" />
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-sm font-bold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deskripsi */}
      <div className="px-5 pb-5">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Deskripsi</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm text-gray-500 leading-relaxed">{car.deskripsi}</p>
        </div>
      </div>

      {/* Bottom Bar Harga + Booking */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-120 bg-white border-t border-gray-200 px-5 py-4 flex items-center justify-between shadow-lg z-50">
        <div>
          <p className="text-xs text-gray-400">Harga per hari</p>
          <p className="text-xl font-bold text-gray-800">
            {formatRupiah(car.price)}
            <span className="text-sm font-normal text-gray-400">/hari</span>
          </p>
        </div>
        <button
          onClick={handleBooking}
          disabled={!car.available}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition shadow-sm ${car.available
            ? "bg-green-500 hover:bg-green-600 text-white border-green-600"
            : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            }`}
        >
          <MessageCircle className="w-5 h-5" />
          {car.available ? "Booking via WA" : "Tidak Tersedia"}
        </button>
      </div>
    </div>
  );
}
