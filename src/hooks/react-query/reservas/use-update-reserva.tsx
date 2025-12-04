import { api } from "@/config/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateReserva } from "@/_types/reserva";

export const updateReservaFn = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateReserva;
}) => {
  const response = await api.put(`/reservas/${id}`, data);
  return response.data;
};

export function useUpdateReserva() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReservaFn,
    onSuccess: () => {
      toast.success("Status da reserva atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
    },
    onError: (error: any) => {
      toast.error("Erro ao atualizar a reserva.");
      console.error("Erro ao atualizar reserva:", error);
    },
  });
}
