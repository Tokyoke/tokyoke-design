// import { Categorie } from "@/_types/card-template";
import { api } from "@/config/api/client";
import { useServerAPI } from "@/config/api/server";
import { useQuery } from "@tanstack/react-query";

export type UseGetAllCategoriesOptions = {
  enabled?: boolean;
  query?: string;
  initialData?: Categorie[];
};

export const getAllCategoriesFn = async ({ query }: { query?: string }) => {
  const isClientSide = typeof window !== "undefined";
  if (isClientSide) {
    const response = await api.get<{ Categories: Categorie[] }>(
      "/card-templates",
      {
        params: { query },
      }
    );
    return response.data.Categories as Categorie[];
  } else {
    const response = await useServerAPI({
      method: "GET",
      url: `card-templates`,
      params: { query },
    });

    if (!response?.ok) {
      console.error("Failed to fetch card templates");
      return [];
    }

    return (await response?.json()).Categories as Categorie[];
  }
};

export default function useGetAllCategories(
  options?: UseGetAllCategoriesOptions
) {
  return useQuery({
    queryKey: options?.query
      ? ["card-templates", options?.query]
      : ["card-templates"],
    queryFn: () => getAllCategoriesFn({ query: options?.query }),
    enabled: options?.enabled,
    initialData: options?.initialData,
    staleTime: 1000 * 60 * 1,
  });
}
