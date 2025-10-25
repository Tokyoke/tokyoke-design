"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Search, ShieldOff, Trash2 } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  status: "ativo" | "bloqueado";
  createdAt: string;
};

const mockUsers: User[] = [
  {
    id: "u1",
    name: "Ana Costa",
    email: "ana.c@email.com",
    phone: "(11) 98888-1111",
    cpf: "111.222.333-44",
    status: "ativo",
    createdAt: "20/10/2025",
  },
  {
    id: "u2",
    name: "Bruno Lima",
    email: "bruno.l@email.com",
    phone: "(21) 97777-2222",
    cpf: "222.333.444-55",
    status: "ativo",
    createdAt: "19/10/2025",
  },
  {
    id: "u3",
    name: "Carlos Silva",
    email: "carlos.s@email.com",
    phone: "(11) 96666-3333",
    cpf: "333.444.555-66",
    status: "bloqueado",
    createdAt: "18/10/2025",
  },
  {
    id: "u4",
    name: "Daniela Alves",
    email: "dani.a@email.com",
    phone: "(31) 95555-4444",
    cpf: "444.555.666-77",
    status: "ativo",
    createdAt: "17/10/2025",
  },
];

export default function AdminUsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cpf.includes(searchTerm)
  );

  const handleBlock = (id: string) => {
    console.log("Bloqueando usuário:", id);
    toast.warning("Usuário bloqueado com sucesso.");
  };

  const handleDelete = (id: string) => {
    console.log("Excluindo usuário:", id);
    toast.error("Usuário excluído.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">Gerenciar Usuários</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, email ou CPF..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-950">
        <CardHeader>
          <CardTitle className="text-white">Lista de Usuários</CardTitle>
          <CardDescription>
            Total de {filteredUsers.length} usuário(s) encontrado(s).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-gray-900">
                <TableHead className="text-white">Nome</TableHead>
                <TableHead className="text-white">Contato</TableHead>
                <TableHead className="text-white">CPF</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-800 hover:bg-gray-900"
                >
                  <TableCell>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </TableCell>
                  <TableCell className="text-gray-300">{user.phone}</TableCell>
                  <TableCell className="text-gray-300">{user.cpf}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "ativo" ? "default" : "destructive"
                      }
                      className={user.status === "ativo" ? "bg-green-600" : ""}
                    >
                      {user.status === "ativo" ? "Ativo" : "Bloqueado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {/* <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleBlock(user.id)}
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-900 hover:text-yellow-400"
                    >
                      <ShieldOff className="h-4 w-4" />
                    </Button> */}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
