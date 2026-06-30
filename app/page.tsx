import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CarList from "./components/CarList";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <main>
        <CarList />
      </main>
      <Footer />
    </div>
  );
}