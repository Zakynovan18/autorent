"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Upload } from "lucide-react";

export default function EditMobilPage() {
  const router = useRouter();
  const { id } = useParams();
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
    image_url: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await supabase
        .from("mobil")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        setForm({
          nama: data.nama,
          kategori: data.kategori,
          tahun: data.tahun,
          seats: String(data.seats),
          transmission: data.transmission,
          bahan_bakar: data.bahan_bakar,
          mesin: data.mesin,
          price: String(data.price),
          rating: String(data.rating),
          reviews: String(data.reviews),
          available: data.available,
          deskripsi: data.deskripsi,
          image_url: data.image_url,
        });
        setPreview(data.image_url);
      }
    };
    fetchCar();
  }, [id]);

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    let image_url = form.image_url;

    // Upload foto baru kalau ada
    if (foto) {
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

      const { data: urlData } = supabase.storage
        .from("mobil-images")
        .getPublicUrl(fileName);

      image_url = urlData.publicUrl;
    }

    // Update data
    const { error } = await supabase
      .from("mobil")
      .update({
        nama: form.nama,
        kategori: form.kategori,
        tahun: form.tahun,
        seats: Number(form.seats),
        transmission: form.transmission,
        bahan_bakar: form.bahan_bakar,
        mesin: form.mesin,
        price: Number(form.price),
        rating: Number(form.rating),
        reviews: Number(form.reviews),
        available: form.available,
        deskripsi: form.deskripsi,
        image_url,
      })
      .eq("id", id);

    if (error) {
      alert("Gagal mengupdate data!");
      setLoading(false);
      return;
    }

    alert("Mobil berhasil diupdate!");
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-gray-900 text-white px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">Edit Mobil</span>
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
              value={form.tahun}
              onChange={(e) => setForm({ ...form, tahun: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600 mb-1 block">Jumlah Kursi</label>
            <input
              type="number"
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
          {loading ? "Menyimpan..." : "Update Mobil"}
        </button>
      </div>
    </div>
  );
}