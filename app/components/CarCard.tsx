import { Users, Settings, Star } from "lucide-react";
import Link from "next/link";

type Car = {
  id: number;
  name: string;
  category: string;
  seats: number;
  transmission: string;
  price: number;
  rating: number;
  available: boolean;
  image: string;
};

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer mx-1">
      {/* Image */}
      <div className="relative">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-44 object-cover"
        />
        <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow ${car.available ? "bg-green-700 text-white" : "bg-gray-400 text-white"
          }`}>
          {car.available ? "Tersedia" : "Tidak Tersedia"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-gray-800">{car.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-600">{car.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{car.seats} Kursi</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Harga per hari</p>
            <p className="text-lg font-bold text-gray-800">
              {formatRupiah(car.price)}
              <span className="text-sm font-normal text-gray-400">/hari</span>
            </p>
          </div>
          <Link
            href={`/mobil/${car.id}`}
            className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-orange-500 shadow-sm transition"
          >
            Booking
          </Link>
        </div>
      </div>
    </div>
  );
}