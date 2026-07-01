"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    question: "Apa saja syarat untuk menyewa mobil?",
    answer: "KTP asli yang masih berlaku, SIM A yang masih berlaku, dan deposit sesuai jenis mobil. Untuk sewa lepas kunci minimal usia 21 tahun.",
  },
  {
    question: "Apakah tersedia layanan dengan driver?",
    answer: "Ya, kami menyediakan layanan dengan driver maupun lepas kunci. Hubungi kami via WhatsApp untuk info lebih lanjut.",
  },
  {
    question: "Berapa minimal hari sewa?",
    answer: "Minimal sewa adalah 1 hari (24 jam). Untuk sewa jangka panjang tersedia harga spesial.",
  },
  {
    question: "Apakah bisa antar jemput?",
    answer: "Ya! Kami siap mengantarkan mobil ke lokasi kamu. Hubungi kami untuk info area dan biaya antar jemput.",
  },
  {
    question: "Bagaimana cara pembayaran?",
    answer: "Pembayaran bisa dilakukan dengan menghubungi admin kami terlebih dahulu via WhatsApp. Kami menerima transfer bank dan pembayaran via e-wallet.",
  },
  {
    question: "Apakah ada biaya tambahan?",
    answer: "Biaya yang tertera sudah termasuk asuransi dasar. Biaya tambahan hanya untuk driver, bahan bakar, dan tol jika diperlukan.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-5 py-6">
      <ScrollReveal>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pertanyaan Umum</h2>
      </ScrollReveal>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <ScrollReveal key={index} delay={index * 0.05} direction="up">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
              >
                <span className="font-semibold text-gray-800 text-sm pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-yellow-400 shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"
                }`}>
                <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}