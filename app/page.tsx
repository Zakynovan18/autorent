import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Keunggulan from "./components/Keunggulan";
import CarList from "./components/CarList";
import CaraBooking from "./components/CaraBooking";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <main>
        <Keunggulan />
        <CarList limit={4} />
        <CaraBooking />
      </main>
      <Footer />
    </div>
  );
}