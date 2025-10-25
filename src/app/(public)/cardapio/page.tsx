import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Cake, Martini, Utensils
} from "lucide-react";
import MenuItem from "@/modules/menu/menu-item";

export default function CardapioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="grow py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-red-500 sm:text-5xl">
            Nosso Cardápio
          </h1>
          <p className="mb-12 text-center text-lg text-gray-300">
            Sabores e drinks feitos para acompanhar os maiores hits.
          </p>

          <Tabs defaultValue="petiscos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900">
              <TabsTrigger
                value="petiscos"
                className="text-white data-[state=active]:text-red-400"
              >
                <Utensils className="mr-2 h-4 w-4" />
                Petiscos
              </TabsTrigger>
              <TabsTrigger
                value="bebidas"
                className="text-white data-[state=active]:text-red-400"
              >
                <Martini className="mr-2 h-4 w-4" />
                Bebidas
              </TabsTrigger>
              <TabsTrigger
                value="sobremesas"
                className="text-white data-[state=active]:text-red-400"
              >
                <Cake className="mr-2 h-4 w-4" />
                Sobremesas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="petiscos" className="mt-6">
              <h2 className="mb-4 text-2xl font-semibold text-red-400">
                Porções & Petiscos
              </h2>
              <div className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                <MenuItem
                  name="Batata Frita Tokyokê"
                  description="Porção generosa com cheddar e bacon crocante."
                  price="R$ 42,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Frango a Passarinho"
                  description="Cortes de frango fritos com alho e salsinha."
                  price="R$ 48,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Pastelzinhos Mistos"
                  description="12 unidades (carne, queijo e pizza)."
                  price="R$ 39,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Tábua de Frios"
                  description="Seleção de queijos, salames e azeitonas."
                  price="R$ 65,00"
                />
              </div>
            </TabsContent>

            <TabsContent value="bebidas" className="mt-6">
              <h2 className="mb-4 text-2xl font-semibold text-red-400">
                Coquetéis da Casa
              </h2>
              <div className="mb-6 rounded-lg border border-gray-800 bg-gray-950 p-6">
                <MenuItem
                  name="Gin Tônica Clássico"
                  description="Gin, água tônica, limão e especiarias."
                  price="R$ 32,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Caipirinha de Saquê"
                  description="Saquê, morango, kiwi ou maracujá."
                  price="R$ 28,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Moscow Mule"
                  description="Vodka, espuma de gengibre e limão."
                  price="R$ 35,00"
                />
              </div>

              <h2 className="mb-4 text-2xl font-semibold text-red-400">
                Cervejas & Não-Alcoólicos
              </h2>
              <div className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                <MenuItem
                  name="Heineken 600ml"
                  description="Cerveja premium lager."
                  price="R$ 18,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Soda Italiana"
                  description="Maçã verde, frutas vermelhas ou limão siciliano."
                  price="R$ 16,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Água Mineral"
                  description="Com ou sem gás."
                  price="R$ 6,00"
                />
              </div>
            </TabsContent>

            <TabsContent value="sobremesas" className="mt-6">
              <h2 className="mb-4 text-2xl font-semibold text-red-400">
                Para Adoçar
              </h2>
              <div className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                <MenuItem
                  name="Petit Gâteau"
                  description="Bolo de chocolate com sorvete de creme."
                  price="R$ 28,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Taça Tokyokê"
                  description="Sorvete, brigadeiro, morangos e chantilly."
                  price="R$ 34,00"
                />
                <Separator className="bg-gray-800" />
                <MenuItem
                  name="Café Espresso"
                  description="Para fechar a noite."
                  price="R$ 8,00"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
