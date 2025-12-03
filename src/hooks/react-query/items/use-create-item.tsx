import { api } from "@/config/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateItem } from "@/_types/item";

export const createItemFn = async (data: CreateItem) => {
  const response = await api.post("/itens", data);
  return response.data;
};

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItemFn,
    onSuccess: () => {
      toast.success("Item criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Erro de conexão: Não foi possível conectar ao servidor. Verifique se o backend está rodando."
        );
      } else {
        toast.error("Erro ao criar item");
      }
      console.error("Erro ao criar item:", error);
    },
  });
}
