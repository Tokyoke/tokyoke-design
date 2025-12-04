import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, History } from "lucide-react";
import ReservationCard from "@/modules/profile/reservation/reservation-card";
import { Reserva } from "@/_types/reserva";

interface ReservationsSectionProps {
  reservas: Reserva[];
}

export default function ReservationsSection({ reservas }: ReservationsSectionProps) {
  const now = new Date();

  const upcomingReservations = reservas.filter(
    (reserva) =>
      new Date(reserva.data) >= now &&
      (reserva.status === "PENDENTE" || reserva.status === "APROVADO")
  );

  const historyReservations = reservas.filter(
    (reserva) =>
      new Date(reserva.data) < now ||
      reserva.status === "REPROVADO" ||
      reserva.status === "APROVADO"
  );

  return (
    <>
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-red-500 sm:text-5xl">
        Minhas Reservas
      </h1>
      <p className="mb-12 text-center text-lg text-gray-300">
        Acompanhe suas reservas futuras e seu histórico de visitas.
      </p>

      <Tabs defaultValue="proximas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900">
          <TabsTrigger
            value="proximas"
            className="data-[state=inactive]:text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Próximas
          </TabsTrigger>
          <TabsTrigger
            value="historico"
            className="data-[state=inactive]:text-white"
          >
            <History className="mr-2 h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proximas" className="mt-6">
          <div className="space-y-6">
            {upcomingReservations.length > 0 ? (
              upcomingReservations.map((reserva) => (
                <ReservationCard key={reserva.id} reserva={reserva} />
              ))
            ) : (
              <p className="text-center text-gray-400">
                Nenhuma reserva próxima encontrada.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="historico" className="mt-6">
          <div className="space-y-6">
            {historyReservations.length > 0 ? (
              historyReservations.map((reserva) => (
                (new Date(reserva.data).getTime() < Date.now()) ? <ReservationCard key={reserva.id} reserva={reserva} /> : null
              ))
            ) : (
              <p className="text-center text-gray-400">
                Nenhuma reserva no histórico encontrada.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
