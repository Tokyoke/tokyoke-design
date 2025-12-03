import { api } from "@/config/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const createCategorieFn = async (data: CreateCategorie) => {
  const response = await api.post("/categorias", {
    Titulo: data.titulo,
    Quantidade: 0,
  });
  return response.data;
};

export function useCreateCategorie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategorieFn,
    onSuccess: () => {
      toast.success("Entrega criada com sucesso");
    },
    onError: (error: any) => {
      toast.error("Erro ao criar entrega");
      console.error("Erro ao criar entrega:", error);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({ queryKey: ["categorie"] });
    },
  });
}
