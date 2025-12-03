import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex h-[60vh] flex-col items-center justify-center text-center">
      <div className="container px-4 md:px-6">
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-red-500">
          TOKYOKÊ
        </h1>
        <h2 className="mt-4 text-2xl font-medium text-gray-300 md:text-3xl">
          Onde a música encontra sua voz!
        </h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link href="/reservas">Fazer Reserva</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white">
            <Link href="/cardapio">Ver Cardápio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
