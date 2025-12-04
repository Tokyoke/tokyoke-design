import { api } from "@/config/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { CreateReserva } from "@/_types/reserva";

export const createReservaFn = async (data: any) => {
  // The user cancelled the previous attempt to configure a proxy,
  // so I will assume the backend is configured for CORS.
  // The API endpoint is /reservas
  const response = await api.post("/reservas", data);
  return response.data;
};

export function useCreateReserva() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReservaFn,
    onSuccess: () => {
      toast.success("Sua pré-reserva foi enviada!", {
        description: "Entraremos em contato em breve para confirmar.",
      });
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
    },
    onError: (error: any) => {
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Erro de conexão: Não foi possível conectar ao servidor."
        );
      } else {
        toast.error("Erro ao enviar reserva. Tente novamente.");
      }
      console.error("Erro ao criar reserva:", error);
    },
  });
}
