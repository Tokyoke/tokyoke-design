import { api } from "@/config/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateItem } from "@/_types/item";

export const updateItemFn = async ({ id, data }: { id: string; data: UpdateItem }) => {
  const response = await api.put(`/itens/${id}`, data);
  return response.data;
};

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItemFn,
    onSuccess: () => {
      toast.success("Item atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Erro de conexão: Não foi possível conectar ao servidor. Verifique se o backend está rodando."
        );
      } else {
        toast.error("Erro ao atualizar item");
      }
      console.error("Erro ao atualizar item:", error);
    },
  });
}
