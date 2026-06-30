"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import CarList from "../components/CarList";

function KatalogContent() {
  const searchParams = useSearchParams();
  const kategori = searchParams.get("kategori") || "Semua";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-5 pt-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Katalog Mobil</h1>
        <p className="text-sm text-gray-400 mb-4">Temukan mobil sesuai kebutuhanmu</p>
      </div>
      <CarList initialCategory={kategori} />
    </div>
  );
}

export default function KatalogPage() {
  return (
    <Suspense>
      <KatalogContent />
    </Suspense>
  );
}