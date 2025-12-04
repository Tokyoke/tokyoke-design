"use client";

import { Reserva } from "@/_types/reserva";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUpdateReserva } from "@/hooks/react-query/reservas/use-update-reserva";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, Pencil, Trash2, X } from "lucide-react";

interface ReservasTableProps {
  reservations: Reserva[];
}

const getStatusVariant = (status: string) => {
  switch (status) {
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

function TableRowActions({ reserva }: { reserva: Reserva }) {
  const updateReserva = useUpdateReserva();

  const handleUpdateStatus = (status: "APROVADO" | "REPROVADO") => {
    updateReserva.mutate({ id: reserva.id, data: { status } });
  };

  if (reserva.status === "PENDENTE") {
    return (
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="border-green-500 text-green-500 hover:bg-green-900 hover:text-green-400"
          onClick={() => handleUpdateStatus("APROVADO")}
          disabled={updateReserva.isPending}
        >
          <Check className="mr-1 h-4 w-4" /> Aprovar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleUpdateStatus("REPROVADO")}
          disabled={updateReserva.isPending}
        >
          <X className="mr-1 h-4 w-4" /> Rejeitar
        </Button>
      </div>
    );
  }

  if (reserva.status === "APROVADO") {
    return (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleUpdateStatus("REPROVADO")}
        disabled={updateReserva.isPending}
      >
        <X className="mr-1 h-4 w-4" /> Cancelar
      </Button>
    );
  }

  return null;
}

export function ReservasTable({ reservations }: ReservasTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-800 hover:bg-gray-900">
          <TableHead className="text-white">CPF</TableHead>
          <TableHead className="text-white">Data / Hora</TableHead>
          <TableHead className="text-white">Pessoas</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-right text-white">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations?.map((res: Reserva) => (
          <TableRow key={res.id} className="border-gray-800 hover:bg-gray-900">
            <TableCell className="font-medium text-white">{res.cpf}</TableCell>
            <TableCell className="text-gray-300">
              {format(new Date(res.data), "dd/MM/yyyy - HH:mm", {
                locale: ptBR,
              })}
            </TableCell>
            <TableCell className="text-gray-300">{res.qnt_pessoas}</TableCell>
            <TableCell>
              <Badge
                variant={getStatusVariant(res.status)}
                className={cn("capitalize")}
              >
                {res.status.toLowerCase()}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <TableRowActions reserva={res} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
