import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/config/api/client";
import { SignUpData } from "@/_types/cadastro";

const signUpFn = async (data: SignUpData) => {
  const response = await api.post("/cadastros/", data);
  return response.data;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpFn,
    onSuccess: (data) => {
      toast.success("Conta criada com sucesso!", {
        description: `Bem-vindo(a), ${data.name}. Faça o login para continuar.`,
      });
    },
    onError: (error) => {
      toast.error("Erro ao criar conta.", {
        description:
          "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
      });
      console.error("Erro ao criar conta:", error);
    },
  });
};
