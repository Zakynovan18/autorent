"use client";

import { Car, X, Menu, User, Home, BookOpen, Info, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menus = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/katalog", label: "Katalog", icon: BookOpen },
    { href: "/tentang", label: "Tentang", icon: Info },
    { href: "/kontak", label: "Kontak", icon: Phone },
  ];

  const categories = ["Semua", "City Car", "SUV", "Luxury"];

  return (
    <>
      <nav className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Car className="text-yellow-400 w-6 h-6" />
          <span className="text-xl font-bold text-gray-800">RentalKu</span>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-gray-600 hover:text-yellow-400 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Car className="text-yellow-400 w-5 h-5" />
            <span className="font-bold text-gray-800">RentalKu</span>
          </div>
          <button onClick={() => setDrawerOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Menu Navigasi */}
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs text-gray-400 font-semibold uppercase mb-3">Menu</p>
          <div className="flex flex-col gap-1">
            {menus.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-yellow-50 hover:text-yellow-500 text-gray-600 transition"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Kategori */}
        <div className="px-5 py-4">
          <p className="text-xs text-gray-400 font-semibold uppercase mb-3">Kategori Mobil</p>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/katalog?kategori=${cat}`}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-yellow-50 hover:text-yellow-500 text-gray-600 transition"
              >
                <Car className="w-4 h-4" />
                <span className="font-medium">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}