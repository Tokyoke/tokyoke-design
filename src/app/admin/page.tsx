import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Check, Clock, User, X } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-red-600 border-2 bg-gray-950 shadow-lg shadow-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-400">
              Reservas Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">4</div>
            <p className="text-xs text-gray-500">Aguardando sua aprovação</p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Reservas (Hoje)
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">12</div>
            <p className="text-xs text-gray-500">+2 confirmadas desde ontem</p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Novos Usuários
            </CardTitle>
            <User className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">+38</div>
            <p className="text-xs text-gray-500">Na última semana</p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Taxa de Ocupação
            </CardTitle>
            <div className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">72%</div>
            <p className="text-xs text-gray-500">Média da semana</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-800 bg-gray-950">
        <CardHeader>
          <CardTitle className="text-white">Reservas Recentes</CardTitle>
          <CardDescription>
            Uma visão rápida das últimas solicitações.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-gray-900">
                <TableHead className="text-white">Cliente</TableHead>
                <TableHead className="text-white">Data</TableHead>
                <TableHead className="text-white">Pessoas</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-gray-800 hover:bg-gray-900">
                <TableCell>
                  <div className="font-medium text-white">Ana Costa</div>
                  <div className="text-sm text-gray-400">ana.c@email.com</div>
                </TableCell>
                <TableCell className="text-gray-300">
                  26/10/2025 - 20:00
                </TableCell>
                <TableCell className="text-gray-300">6</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pendente</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-green-500 text-green-500 hover:bg-green-900 hover:text-green-400"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow className="border-gray-800 hover:bg-gray-900">
                <TableCell>
                  <div className="font-medium text-white">Carlos Silva</div>
                  <div className="text-sm text-gray-400">
                    carlos.s@email.com
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">
                  25/10/2025 - 19:00
                </TableCell>
                <TableCell className="text-gray-300">4</TableCell>
                <TableCell>
                  <Badge variant="default">Confirmada</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2 text-white">
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
