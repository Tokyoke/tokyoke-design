"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllReservas } from "@/hooks/react-query/reservas/use-get-all-reservas";
import { useUpdateReserva } from "@/hooks/react-query/reservas/use-update-reserva";
import { cn } from "@/lib/utils";
import { ReservaCompleta } from "@/_types/reserva";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Check, Clock, History, X } from "lucide-react";

const getStatusVariant = (status: string) => {
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

export default function AdminReservasPage() {
  const {
    data: allReservations,
    isLoading,
    isError,
  } = useGetAllReservas();
  const updateReserva = useUpdateReserva();

  const handleUpdateStatus = (
    id: number,
    status: "confirmada" | "cancelada"
  ) => {
    updateReserva.mutate({ id, data: { status } });
  };

  const renderTable = (statusFilter?: string) => {
    const reservations = statusFilter
      ? allReservations?.filter((r) => r.status === statusFilter)
      : allReservations?.filter(
          (r) => r.status === "pendente" || r.status === "confirmada"
        );

    if (isLoading) return <p>Carregando reservas...</p>;
    if (isError) return <p>Erro ao carregar as reservas.</p>;
    if (!reservations || reservations.length === 0)
      return <p>Nenhuma reserva encontrada.</p>;

    return (
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-900">
            <TableHead className="text-white">Cliente</TableHead>
            <TableHead className="text-white">Contato</TableHead>
            <TableHead className="text-white">Data / Hora</TableHead>
            <TableHead className="text-white">Pessoas</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-right text-white">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((res: ReservaCompleta) => (
            <TableRow
              key={res.idReserva}
              className="border-gray-800 hover:bg-gray-900"
            >
              <TableCell className="font-medium text-white">
                {res.cadastro.Nome}
              </TableCell>
              <TableCell className="text-gray-300">
                {res.cadastro.Telefone}
              </TableCell>
              <TableCell className="text-gray-300">
                {format(new Date(res.Data), "dd/MM/yyyy - HH:mm", {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell className="text-gray-300">
                {res.Qnt_de_pessoas}
              </TableCell>
              <TableCell>
                <Badge
                  variant={getStatusVariant(res.status)}
                  className={cn(
                    "capitalize",
                    res.status === "concluida" && "text-white"
                  )}
                >
                  {res.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                {res.status === "pendente" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500 text-green-500 hover:bg-green-900 hover:text-green-400"
                      onClick={() =>
                        handleUpdateStatus(res.idReserva, "confirmada")
                      }
                      disabled={updateReserva.isPending}
                    >
                      <Check className="mr-1 h-4 w-4" /> Aprovar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(res.idReserva, "cancelada")
                      }
                      disabled={updateReserva.isPending}
                    >
                      <X className="mr-1 h-4 w-4" /> Cancelar
                    </Button>
                  </>
                )}
                {res.status === "confirmada" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(res.idReserva, "cancelada")
                    }
                    disabled={updateReserva.isPending}
                  >
                    <X className="mr-1 h-4 w-4" /> Cancelar
                  </Button>
                )}
                {res.status === "concluida" && (
                  <Button variant="ghost" size="sm">
                    Ver Detalhes
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card className="border-gray-800 bg-gray-950">
      <CardContent className="pt-6">
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

          <TabsContent value="proximas">{renderTable()}</TabsContent>
          <TabsContent value="pendentes">
            {renderTable("pendente")}
          </TabsContent>
          <TabsContent value="historico">
            {renderTable("concluida")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
