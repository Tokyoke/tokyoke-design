import { api } from "@/config/api/client";
import { useQuery } from "@tanstack/react-query";
import { ReservaCompleta } from "@/_types/reserva";

export const getAllReservasFn = async (): Promise<ReservaCompleta[]> => {
  const response = await api.get("/reservas/");
  console.log("Fetched reservas:", response.data);
  return response.data;
};

export function useGetAllReservas() {
  return useQuery({
    queryKey: ["reservas"],
    queryFn: getAllReservasFn,
  });
}
