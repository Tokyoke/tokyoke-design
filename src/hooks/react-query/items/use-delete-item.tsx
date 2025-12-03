import { api } from "@/config/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteItemFn = async (id: string) => {
  const response = await api.delete(`/itens/${id}`);
  return response.data;
};

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemFn,
    onSuccess: () => {
      toast.success("Item excluído com sucesso");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Erro de conexão: Não foi possível conectar ao servidor. Verifique se o backend está rodando."
        );
      } else {
        toast.error("Erro ao excluir item");
      }
      console.error("Erro ao excluir item:", error);
    },
  });
}
