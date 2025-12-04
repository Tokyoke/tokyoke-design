import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api/client";
import { BackendUser } from "@/_types/cadastro";

const getCadastroByIdFn = async (id: string): Promise<BackendUser> => {
  const response = await api.get(`/cadastros/${id}`);
  return response.data;
};

export const useGetCadastroById = (id: string) => {
  return useQuery({
    queryKey: ["cadastros", id],
    queryFn: () => getCadastroByIdFn(id),
    enabled: !!id, // The query will not run until the id is provided
  });
};
