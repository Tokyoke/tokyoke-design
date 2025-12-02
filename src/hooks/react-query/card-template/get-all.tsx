import { CardTemplate } from "@/_types/card-template";
import api from "@/config/api/client";
import { useServerAPI } from "@/config/api/server";
import { useQuery } from "@tanstack/react-query";

export type UseGetAllCardTemplatesOptions = {
  enabled?: boolean;
  query?: string;
  initialData?: CardTemplate[];
};

export const getAllCardTemplatesFn = async ({ query }: { query?: string }) => {
  const isClientSide = typeof window !== "undefined";
  if (isClientSide) {
    const response = await api.get<{ cardTemplates: CardTemplate[] }>(
      "/card-templates",
      {
        params: { query },
      }
    );
    return response.data.cardTemplates as CardTemplate[];
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

    return (await response?.json()).cardTemplates as CardTemplate[];
  }
};

export default function useGetAllCardTemplates(
  options?: UseGetAllCardTemplatesOptions
) {
  return useQuery({
    queryKey: options?.query
      ? ["card-templates", options?.query]
      : ["card-templates"],
    queryFn: () => getAllCardTemplatesFn({ query: options?.query }),
    enabled: options?.enabled,
    initialData: options?.initialData,
    staleTime: 1000 * 60 * 1,
  });
}
