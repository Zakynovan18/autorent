"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, LogOut, Car } from "lucide-react";

type Car = {
  id: number;
  nama: string;
  kategori: string;
  price: number;
  available: boolean;
  image_url: string;
};

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchCars();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/admin/login");
  };

  const fetchCars = async () => {
    const { data } = await supabase.from("mobil").select("*").order("id");
    setCars(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const konfirmasi = confirm("Yakin ingin menghapus mobil ini?");
    if (!konfirmasi) return;
    await supabase.from("mobil").delete().eq("id", id);
    fetchCars();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gray-900 text-white px-5 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-yellow-400" />
          <span className="font-bold">Admin Panel</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Tombol Tambah */}
      <div className="px-5 py-5">
        <button
          onClick={() => router.push("/admin/tambah")}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 rounded-xl border border-gray-800 flex items-center justify-center gap-2 transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Mobil Baru
        </button>
      </div>

      {/* List Mobil */}
      <div className="px-5">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Daftar Mobil</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="flex gap-3 p-3">
                  <img
                    src={car.image_url}
                    alt={car.nama}
                    className="w-24 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">{car.nama}</h3>
                    <p className="text-xs text-gray-400 mb-1">{car.kategori}</p>
                    <p className="text-sm font-semibold text-gray-700">{formatRupiah(car.price)}/hari</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${car.available
                        ? "bg-yellow-400 text-gray-800 border-gray-800"
                        : "bg-gray-200 text-gray-600 border-gray-400"
                      }`}>
                      {car.available ? "Tersedia" : "Tidak Tersedia"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex border-t border-gray-100">
                  <button
                    onClick={() => router.push(`/admin/edit/${car.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-blue-500 hover:bg-blue-50 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <div className="w-px bg-gray-100" />
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}