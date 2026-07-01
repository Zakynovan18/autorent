"use client";

import { Home, Car, Phone, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const menus = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/katalog", label: "Katalog", icon: Car },
    { href: "/tentang", label: "Tentang", icon: Info },
    { href: "/kontak", label: "Kontak", icon: Phone },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-120 bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="flex items-center justify-around py-2 px-2">
        {menus.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-3 py-1"
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? "bg-yellow-100" : "bg-transparent"
                }`}>
                <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-gray-800" : "text-gray-600"
                  }`} />
              </div>
              <span className={`text-xs font-medium transition-all duration-300 ${isActive ? "text-yellow-300" : "text-gray-600"
                }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}