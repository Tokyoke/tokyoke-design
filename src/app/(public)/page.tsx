"use client";

import AboutUs from "@/modules/home/about-us";
import Hero from "@/modules/home/hero";
import Services from "@/modules/home/services";
import Header from "@/modules/_global/header";
import Footer from "@/modules/_global/footer";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession()
  console.log('Session data:', session);

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
