import AboutUs from "@/modules/home/about-us";
import Hero from "@/modules/home/hero";
import Services from "@/modules/home/services";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="grow">
        <Hero />

        <Services />

        <AboutUs />
      </main>
    </div>
  );
}
