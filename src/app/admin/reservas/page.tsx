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
import { cn } from "@/lib/utils";
import { Calendar, Check, Clock, History, Phone, X } from "lucide-react";

const allReservations = [
  {
    id: 1,
    name: "Ana Costa",
    phone: "(11) 98888-1111",
    date: "26/10/2025 - 20:00",
    guests: 6,
    status: "pendente",
  },
  {
    id: 2,
    name: "Bruno Lima",
    phone: "(21) 97777-2222",
    date: "26/10/2025 - 21:00",
    guests: 2,
    status: "pendente",
  },
  {
    id: 3,
    name: "Carlos Silva",
    phone: "(11) 96666-3333",
    date: "25/10/2025 - 19:00",
    guests: 4,
    status: "confirmada",
  },
  {
    id: 4,
    name: "Daniela Alves",
    phone: "(31) 95555-4444",
    date: "25/10/2025 - 22:00",
    guests: 8,
    status: "confirmada",
  },
  {
    id: 5,
    name: "Eduardo Reis",
    phone: "(41) 94444-5555",
    date: "24/10/2025 - 20:00",
    guests: 5,
    status: "concluida",
  },
];

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
  const renderTable = (statusFilter?: string) => {
    const reservations = statusFilter
      ? allReservations.filter((r) => r.status === statusFilter)
      : allReservations.filter(
          (r) => r.status === "pendente" || r.status === "confirmada"
        );

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
          {reservations.map((res) => (
            <TableRow
              key={res.id}
              className="border-gray-800 hover:bg-gray-900"
            >
              <TableCell className="font-medium text-white">
                {res.name}
              </TableCell>
              <TableCell className="text-gray-300">{res.phone}</TableCell>
              <TableCell className="text-gray-300">{res.date}</TableCell>
              <TableCell className="text-gray-300">{res.guests}</TableCell>
              <TableCell>
                <Badge
                  variant={getStatusVariant(res.status)}
                  className={cn("capitalize", res.status === "concluida" && "text-white")}
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
                    >
                      <Check className="mr-1 h-4 w-4" /> Aprovar
                    </Button>
                    <Button variant="destructive" size="sm">
                      <X className="mr-1 h-4 w-4" /> Cancelar
                    </Button>
                  </>
                )}
                {res.status === "confirmada" && (
                  <Button variant="destructive" size="sm">
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
          {/* Abas de Filtro */}
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
          <TabsContent value="pendentes">{renderTable("pendente")}</TabsContent>
          <TabsContent value="historico">
            {renderTable("concluida")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
