import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Mic, Utensils } from "lucide-react";
import Link from "next/link";

export default function Services() {
  return (
    <section className="container mx-auto my-16 px-4 md:px-6">
      <h3 className="mb-8 text-center text-3xl font-bold tracking-tight">
        Nossos Serviços
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex flex-col justify-between border-gray-800 bg-gray-950">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Utensils className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-center text-2xl">Cardápio/Bar</CardTitle>
            <CardDescription className="text-center">
              Descubra nossos drinks e porções.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-400">
              Uma seleção completa de bebidas, coquetéis e petiscos para
              acompanhar sua cantoria.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/cardapio">Ver Cardápio Completo</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-between border-red-600 border-2 bg-gray-950 shadow-lg shadow-red-900/20">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Calendar className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-center text-2xl">Reservas</CardTitle>
            <CardDescription className="text-center">
              Garanta sua sala privativa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-400">
              Reserve online de forma fácil e rápida. Perfeito para festas,
              eventos ou uma noite divertida com amigos.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/reservas">Agendar Agora</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-between border-gray-800 bg-gray-950 opacity-50 cursor-not-allowed">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Mic className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-center text-2xl">
              Biblioteca Musical
            </CardTitle>
            <CardDescription className="text-center">
              Milhares de músicas à sua escolha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-400">
              Do pop ao rock, do sertanejo ao k-pop. Nosso catálogo é atualizado
              constantemente.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild disabled>
              <Link href="#" className="cursor-not-allowed">
                Explorar Músicas
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
