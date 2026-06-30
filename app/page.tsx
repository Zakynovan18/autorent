import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CarList from "./components/CarList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <main>
        <CarList />
      </main>
    </div>
  );
}