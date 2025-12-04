import { api } from "@/config/api/client";
import { useQuery } from "@tanstack/react-query";
// import { Reserva } from "@/_types/reserva";

export const getAllReservasFn = async (): Promise<Reserva[]> => {
  const response = await api.get("/reservas/");
  return response.data;
};

export function useGetAllReservas() {
  return useQuery({
    queryKey: ["reservas"],
    queryFn: getAllReservasFn,
  });
}
