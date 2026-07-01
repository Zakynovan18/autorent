import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Keunggulan from "./components/Keunggulan";
import CarList from "./components/CarList";
import CaraBooking from "./components/CaraBooking";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <main>
        <CarList limit={4} />
        <Keunggulan />
        <CaraBooking />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}