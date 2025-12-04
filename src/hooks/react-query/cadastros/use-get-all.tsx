import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api/client";
import { BackendUser } from "@/_types/cadastro";

const getAllCadastrosFn = async (): Promise<BackendUser[]> => {
  const response = await api.get("/cadastros/");
  return response.data;
};

export const useGetAllCadastros = () => {
  return useQuery({
    queryKey: ["cadastros"],
    queryFn: getAllCadastrosFn,
  });
};
