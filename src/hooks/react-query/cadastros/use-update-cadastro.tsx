import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/config/api/client";
import { UpdateCadastroData } from "@/_types/cadastro";

interface UpdateCadastroArgs {
  id: string;
  data: UpdateCadastroData;
}

const updateCadastroFn = async ({ id, data }: UpdateCadastroArgs) => {
  const response = await api.put(`/cadastros/${id}`, data);
  return response.data;
};

export const useUpdateCadastro = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCadastroFn,
    onSuccess: (data) => {
      toast.success("Cadastro atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cadastros", data.idCadastro.toString()] });
      queryClient.invalidateQueries({ queryKey: ["cadastros"] });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar cadastro.", {
        description:
          "Ocorreu um erro ao atualizar o cadastro. Por favor, tente novamente.",
      });
      console.error("Erro ao atualizar cadastro:", error);
    },
  });
};
