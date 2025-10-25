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

type ReservationStatus = "confirmada" | "pendente" | "concluida" | "cancelada";

interface ReservationCardProps {
  date: string;
  time: string;
  guests: string;
  room: string;
  status: ReservationStatus;
}

export default function ReservationCard({
  date,
  time,
  guests,
  room,
  status,
}: ReservationCardProps) {
  const getStatusVariant = () => {
    switch (status) {
      case "confirmada":
        return "default";
      case "pendente":
        return "secondary";
      case "cancelada":
        return "destructive";
      case "concluida":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "confirmada":
        return <CheckCircle className="mr-1 h-3 w-3" />;
      case "pendente":
        return <Clock className="mr-1 h-3 w-3" />;
      case "cancelada":
        return <XCircle className="mr-1 h-3 w-3" />;
      case "concluida":
        return <History className="mr-1 h-3 w-3" />;
    }
  };

  return (
    <Card className="border-gray-800 bg-gray-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">{date}</CardTitle>
          <Badge variant={getStatusVariant()} className={cn("capitalize", status === "concluida" && "text-white")}>
            {getStatusIcon()}
            {status}
          </Badge>
        </div>
        <CardDescription>Sala {room}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{guests} pessoas</span>
          </div>
        </div>
      </CardContent>
      {(status === "confirmada" || status === "pendente") && (
        <CardFooter className="border-t border-gray-800 pt-4">
          <Button variant="destructive" size="sm">
            <XCircle className="mr-2 h-4 w-4" />
            Cancelar Reserva
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
