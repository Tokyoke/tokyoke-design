import AboutUs from "@/modules/home/about-us";
import Hero from "@/modules/home/hero";
import Services from "@/modules/home/services";
import Header from "@/modules/_global/header";
import Footer from "@/modules/_global/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <main className="grow">
        <Hero />

        <Services />

        <AboutUs />
      </main>
    </div>
  );
}
