"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import MenuItem from "@/modules/menu/menu-item";
import useGetAllCategories from "@/hooks/react-query/categories/get-all";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export default function CardapioPage() {
  const { data: categories, isLoading, isError } = useGetAllCategories();
  console.log("Categories:", categories);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Carregando...
      </div>
    );
  }

  if (isError || !categories) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Ocorreu um erro ao carregar o cardápio.
      </div>
    );
  }

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

          <Tabs
            defaultValue={categories[0]?.titulo.toLowerCase()}
            className="w-full"
          >
            <TabsList
              className={`flex justify-center items-center w-full bg-gray-900`}
            >
              {categories.map((category: Categorie) => (
                <TabsTrigger
                  key={category.id}
                  value={category.titulo.toLowerCase()}
                  className="text-white data-[state=active]:text-red-400"
                >
                  {category.titulo}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category: Categorie) => (
              <TabsContent
                key={category.id}
                value={category.titulo.toLowerCase()}
                className="mt-6"
              >
                <h2 className="mb-4 text-2xl font-semibold text-red-400">
                  {category.titulo}
                </h2>
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                  {category.itens?.map((item, index) => (
                    <div key={item.idItem}>
                      <MenuItem
                        name={item.nome}
                        description={item.descricao}
                        price={formatPrice(item.valor)}
                      />
                      {index < (category?.itens?.length ?? 0) - 1 && (
                        <Separator className="bg-gray-800" />
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
