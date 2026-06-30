"use client";

import { Home, Car, Phone, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const menus = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/katalog", label: "Katalog", icon: Car },
    { href: "/tentang", label: "Tentang", icon: Info },
    { href: "/kontak", label: "Kontak", icon: Phone },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around py-2">
        {menus.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-yellow-400" : "text-gray-400"
                  }`}
              />
              <span
                className={`text-xs font-medium ${isActive ? "text-yellow-400" : "text-gray-400"
                  }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}