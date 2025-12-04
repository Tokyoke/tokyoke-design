import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, History, Users, XCircle } from "lucide-react";
// import { Reserva } from "@/_types/reserva";
import { useUpdateReserva } from "@/hooks/react-query/reservas/use-update-reserva";

type ReservationStatus = "PENDENTE" | "CONFIRMADA" | "CANCELADA" | "CONCLUIDA";

interface ReservationCardProps {
  reserva: Reserva;
}

export default function ReservationCard({ reserva }: ReservationCardProps) {
  const getStatusVariant = () => {
    switch (reserva.status) {
      case "APROVADO":
        return "default";
      case "PENDENTE":
        return "secondary";
      case "REPROVADO":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusColor = () => {
    switch (reserva.status) {
      case "APROVADO":
        return "bg-green-500";
      case "PENDENTE":
        return "bg-yellow-500";
      case "REPROVADO":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = () => {
    switch (reserva.status) {
      case "APROVADO":
        return <CheckCircle className="mr-1 h-3 w-3" />;
      case "PENDENTE":
        return <Clock className="mr-1 h-3 w-3" />;
      case "REPROVADO":
        return <XCircle className="mr-1 h-3 w-3" />;
    }
  };

  const updateReserva = useUpdateReserva();
  
  const handleUpdateStatus = () => {
    updateReserva.mutate({ id: reserva.id, data: { status: "REPROVADO" } });
  };

  const formattedDate = new Date(reserva.data).toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Placeholder for time and room as they are not in the Reserva type
  const time = reserva.data.split("T")[1] || "Indisponível";


  return (
    <Card className="border-gray-800 bg-gray-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">{formattedDate}</CardTitle>
          <Badge variant={getStatusVariant()} className={cn("capitalize", reserva.status === "APROVADO", getStatusColor())}>
            {getStatusIcon()}
            {reserva.status.toLowerCase()}
          </Badge>
        </div>
        {/* <CardDescription>Sala {room}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{reserva.qnt_pessoas} pessoas</span>
          </div>
        </div>
      </CardContent>
      {(reserva.status === "APROVADO" || reserva.status === "PENDENTE") && (new Date(reserva.data).getTime() > Date.now()) && (
        <CardFooter className="border-t border-gray-800 pt-4">
          <Button variant="destructive" size="sm" onClick={() => alert("Não foi implementado!")}>
            <XCircle className="mr-2 h-4 w-4" />
            Cancelar Reserva
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
