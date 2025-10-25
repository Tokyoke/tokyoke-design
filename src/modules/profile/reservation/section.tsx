import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, History } from "lucide-react";
import ReservationCard from "@/modules/profile/reservation/reservation-card";

export default function ReservationsSection() {
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
            <ReservationCard
              date="Sábado, 08 de Novembro"
              time="20:00 - 22:00"
              guests="6"
              room="M (até 8 pessoas)"
              status="confirmada"
            />
            <ReservationCard
              date="Sexta, 21 de Novembro"
              time="19:00 - 21:00"
              guests="10"
              room="G (até 15 pessoas)"
              status="pendente"
            />
          </div>
        </TabsContent>

        <TabsContent value="historico" className="mt-6">
          <div className="space-y-6">
            <ReservationCard
              date="Quinta, 18 de Outubro"
              time="21:00 - 23:00"
              guests="4"
              room="P (até 4 pessoas)"
              status="concluida"
            />
            <ReservationCard
              date="Sexta, 03 de Outubro"
              time="20:00 - 22:00"
              guests="8"
              room="M (até 8 pessoas)"
              status="cancelada"
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
