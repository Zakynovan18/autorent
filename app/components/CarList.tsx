"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import CarCard from "./CarCard";
import { supabase } from "@/lib/supabase";
import ScrollReveal from "./ScrollReveal";

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

const categories = ["Semua", "City Car", "SUV", "Luxury", "MPV", "Truck"];

export default function CarList({
  initialCategory = "Semua",
  limit,
}: {
  initialCategory?: string;
  limit?: number;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase.from("mobil").select("*");
      if (error) console.error(error);
      else setCars(data || []);
      setLoading(false);
    };
    fetchCars();
  }, []);

  const filtered = cars.filter((car) => {
    const matchCategory =
      activeCategory === "Semua" || car.kategori === activeCategory;
    const matchSearch = car.nama.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="bg-gray-50 px-5 pt-5 pb-24">
      {/* Search Bar — sembunyikan kalau ada limit */}
      {!limit && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari model favorit kamu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      )}

      {/* Filter Kategori — sembunyikan kalau ada limit */}
      {!limit && (
        <div className="flex flex-row gap-2 mb-6 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition border ${activeCategory === cat
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-500 border-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Header section home */}
      {limit && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Pilihan Mobil Terbaik</h2>
          <Link
            href="/katalog"
            className="text-yellow-500 text-sm font-medium hover:text-yellow-600 transition"
          >
            Lihat Semua →
          </Link>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Car Cards */}
      {!loading && (
        <div className="flex flex-col gap-6">
          {displayed.length > 0 ? (
            displayed.map((car, index) => (
              <ScrollReveal key={car.id} delay={index * 0.1} direction="up">
                <CarCard
                  car={{
                    id: car.id,
                    name: car.nama,
                    category: car.kategori,
                    seats: car.seats,
                    transmission: car.transmission,
                    price: car.price,
                    rating: car.rating,
                    available: car.available,
                    image: car.image_url,
                  }}
                />
              </ScrollReveal>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10">Mobil tidak ditemukan.</p>
          )}
        </div>
      )}
    </section>
  );
}