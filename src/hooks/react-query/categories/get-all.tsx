import { api } from "@/config/api/client";
import { useServerAPI } from "@/config/api/server";
import { useQuery } from "@tanstack/react-query";

export type UseGetAllCategoriesOptions = {
  initialData?: Categorie[];
};

export const getAllCategoriesFn = async ({ query }: { query?: string }) => {
  try {
    const isClientSide = typeof window !== "undefined";
    if (isClientSide) {
      const response = await api.get<Categorie[]>("/categorias", {
        params: { query },
      });
      console.log("API Response:", response);

      return response.data || [];
    } else {
      const response = await useServerAPI({
        method: "GET",
        url: `categorias`,
        params: { query },
      });

      if (!response?.ok) {
        console.error("Failed to fetch card templates");
        return [];
      }
      const data = await response.json();
      return data.Categories || [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default function useGetAllCategories(
  options?: UseGetAllCategoriesOptions
) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategoriesFn({}),
    initialData: options?.initialData,
    staleTime: 1000 * 60 * 1,
  });
}
