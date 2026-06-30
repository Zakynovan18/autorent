"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Upload } from "lucide-react";

export default function TambahMobilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    nama: "",
    kategori: "City Car",
    tahun: "",
    seats: "",
    transmission: "Automatic",
    bahan_bakar: "Bensin",
    mesin: "",
    price: "",
    rating: "",
    reviews: "0",
    available: true,
    deskripsi: "",
  });

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!foto) return alert("Pilih foto mobil dulu!");
    if (!form.nama || !form.price) return alert("Nama dan harga wajib diisi!");

    setLoading(true);

    // Upload foto ke Supabase Storage
    const fileExt = foto.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("mobil-images")
      .upload(fileName, foto);

    if (uploadError) {
      alert("Gagal upload foto!");
      setLoading(false);
      return;
    }

    // Ambil URL foto
    const { data: urlData } = supabase.storage
      .from("mobil-images")
      .getPublicUrl(fileName);

    // Simpan data ke tabel mobil
    const { error: insertError } = await supabase.from("mobil").insert({
      nama: form.nama,
      kategori: form.kategori,
      tahun: form.tahun,
      seats: Number(form.seats),
      transmission: form.transmission,
      bahan_bakar: form.bahan_bakar,
      mesin: form.mesin,
      price: Number(form.price),
      rating: Number(form.rating) || 5.0,
      reviews: Number(form.reviews) || 0,
      available: form.available,
      image_url: urlData.publicUrl,
      deskripsi: form.deskripsi,
    });

    if (insertError) {
      alert("Gagal menyimpan data!");
      setLoading(false);
      return;
    }

    alert("Mobil berhasil ditambahkan!");
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gray-900 text-white px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">Tambah Mobil</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-4">
        {/* Upload Foto */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">Foto Mobil</label>
          <label className="cursor-pointer">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-48 object-cover rounded-2xl border-2 border-yellow-400"
              />
            ) : (
              <div className="w-full h-48 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white gap-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-400">Tap untuk upload foto</p>
                <p className="text-xs text-gray-300">JPG, PNG, WEBP</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFoto}
              className="hidden"
            />
          </label>
        </div>

        {/* Nama */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Nama Mobil</label>
          <input
            type="text"
            placeholder="contoh: Honda Civic"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Kategori</label>
          <select
            value={form.kategori}
            onChange={(e) => setForm({ ...form, kategori: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          >
            <option>City Car</option>
            <option>SUV</option>
            <option>Luxury</option>
            <option>MPV</option>
            <option>Truck</option>
          </select>
        </div>

        {/* Tahun & Seats */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-1 block">Tahun</label>
            <input
              type="number"
              placeholder="2023"
              value={form.tahun}
              onChange={(e) => setForm({ ...form, tahun: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-1 block">Jumlah Kursi</label>
            <input
              type="number"
              placeholder="5"
              value={form.seats}
              onChange={(e) => setForm({ ...form, seats: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Transmisi & Bahan Bakar */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-1 block">Transmisi</label>
            <select
              value={form.transmission}
              onChange={(e) => setForm({ ...form, transmission: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
            >
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-1 block">Bahan Bakar</label>
            <select
              value={form.bahan_bakar}
              onChange={(e) => setForm({ ...form, bahan_bakar: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
            >
              <option>Bensin</option>
              <option>Solar</option>
              <option>Listrik</option>
              <option>Hybrid</option>
            </select>
          </div>
        </div>

        {/* Mesin */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Mesin</label>
          <input
            type="text"
            placeholder="contoh: 1.5L VTEC"
            value={form.mesin}
            onChange={(e) => setForm({ ...form, mesin: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Harga */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Harga per Hari (Rp)</label>
          <input
            type="number"
            placeholder="contoh: 350000"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-2 block">Status</label>
          <div className="flex gap-3">
            <button
              onClick={() => setForm({ ...form, available: true })}
              className={`flex-1 py-3 rounded-xl text-sm font-medium border transition ${form.available
                  ? "bg-yellow-400 text-gray-800 border-gray-800"
                  : "bg-white text-gray-500 border-gray-200"
                }`}
            >
              Tersedia
            </button>
            <button
              onClick={() => setForm({ ...form, available: false })}
              className={`flex-1 py-3 rounded-xl text-sm font-medium border transition ${!form.available
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-500 border-gray-200"
                }`}
            >
              Tidak Tersedia
            </button>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Deskripsi</label>
          <textarea
            placeholder="Tulis deskripsi singkat mobil..."
            rows={3}
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 rounded-xl border border-gray-800 transition shadow-sm mt-2"
        >
          {loading ? "Menyimpan..." : "Simpan Mobil"}
        </button>
      </div>
    </div>
  );
}