"use client";

import Navbar from "../components/Navbar";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function KontakPage() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });

  const handleWA = () => {
    const pesan = `Halo AutoRent! Perkenalkan saya ${form.nama}. ${form.pesan}`;
    const url = `https://wa.me/6281358714035?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />

      {/* Hero */}
      <div className="bg-gray-900 text-white px-6 py-12">
        <h1 className="text-3xl font-bold mb-3">Hubungi Kami</h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Ada pertanyaan atau ingin booking? Kami siap membantu kamu!
        </p>
      </div>

      {/* Info Kontak */}
      <div className="px-5 py-6 flex flex-col gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
          <div className="bg-yellow-400 p-3 rounded-xl">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Telepon</p>
            <p className="font-semibold text-gray-800">+62 812-3456-7890</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
          <div className="bg-yellow-400 p-3 rounded-xl">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Email</p>
            <p className="font-semibold text-gray-800">autorent@email.com</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
          <div className="bg-yellow-400 p-3 rounded-xl">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Alamat</p>
            <p className="font-semibold text-gray-800">Jl. Raya No. 123, Kota Malang</p>
          </div>
        </div>
      </div>

      {/* Form Pesan */}
      <div className="px-5 pb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Kirim Pesan</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Nama</label>
            <input
              type="text"
              placeholder="Nama lengkap kamu"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Email kamu"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Pesan</label>
            <textarea
              placeholder="Tulis pesanmu di sini..."
              rows={4}
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            />
          </div>

          <button
            onClick={handleWA}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm border border-green-600"
          >
            <MessageCircle className="w-5 h-5" />
            Kirim via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}