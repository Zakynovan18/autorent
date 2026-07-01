"use client";

import { Shield, Clock, ThumbsUp, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const keunggulan = [
  {
    icon: Shield,
    title: "Terpercaya",
    desc: "Armada terawat dan berlisensi resmi.",
  },
  {
    icon: Clock,
    title: "24 Jam",
    desc: "Siap melayani kapan saja kamu butuhkan.",
  },
  {
    icon: ThumbsUp,
    title: "Mudah",
    desc: "Booking langsung via WhatsApp, tanpa ribet.",
  },
  {
    icon: MapPin,
    title: "Antar Jemput",
    desc: "Mobil diantar ke lokasi kamu.",
  },
];

export default function Keunggulan() {
  return (
    <section className="px-5 pt-2 pb-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mengapa Memilih Kami?</h2>
      </ScrollReveal>
      <div className="grid grid-cols-2 gap-3">
        {keunggulan.map(({ icon: Icon, title, desc }, index) => (
          <ScrollReveal key={title} delay={index * 0.1} direction="up">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2 transition hover:shadow-md hover:-translate-y-0.5">
              <div className="bg-yellow-400 p-2.5 rounded-xl w-fit">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}