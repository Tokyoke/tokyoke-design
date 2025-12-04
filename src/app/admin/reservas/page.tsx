"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllReservas } from "@/hooks/react-query/reservas/use-get-all-reservas";
import { CreateNewReservation } from "@/modules/admin/reservas/create-new-reservation";
import { ReservasTable } from "@/modules/admin/reservas/reservas-table";
import { Calendar, Clock, History } from "lucide-react";

export default function AdminReservasPage() {
  const {
    data: allReservations,
    isLoading,
    isError,
  } = useGetAllReservas();

  if (isLoading) return <p>Carregando reservas...</p>;
  if (isError) return <p>Erro ao carregar as reservas.</p>;

  const approvedReservations =
    allReservations?.filter((r) => r.status === "APROVADO") || [];
  const pendingReservations =
    allReservations?.filter((r) => r.status === "PENDENTE") || [];
  const historyReservations =
    allReservations?.filter((r) => r.status === "REPROVADO") || [];

  return (
    <Card className="border-gray-800 bg-gray-950">
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <CreateNewReservation />
        </div>
        <Tabs defaultValue="proximas" className="w-full">
          <TabsList className="mb-4 bg-gray-900">
            <TabsTrigger
              value="proximas"
              className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
            >
              <Calendar className="mr-2 h-4 w-4" /> Próximas
            </TabsTrigger>
            <TabsTrigger
              value="pendentes"
              className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
            >
              <Clock className="mr-2 h-4 w-4" /> Pendentes
            </TabsTrigger>
            <TabsTrigger
              value="historico"
              className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
            >
              <History className="mr-2 h-4 w-4" /> Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proximas">
            <ReservasTable reservations={approvedReservations} />
          </TabsContent>
          <TabsContent value="pendentes">
            <ReservasTable reservations={pendingReservations} />
          </TabsContent>
          <TabsContent value="historico">
            <ReservasTable reservations={historyReservations} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}