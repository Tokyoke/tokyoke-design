import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeInfo, Phone, User } from "lucide-react";

export default function PersonalInfos({
  user,
}: {
  user: { name: string; phone: string; cpf: string };
}) {
  return (
    <>
      <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-red-500 sm:text-5xl">
        Meu Perfil
      </h1>
      <p className="mb-12 text-center text-lg text-gray-300">
        Gerencie seus dados e acompanhe suas reservas.
      </p>

      <Card className="mb-12 border-gray-800 bg-gray-950">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-red-400">
            Meus Dados Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="flex items-center text-lg">
            <User className="mr-4 h-5 w-5 shrink-0 text-gray-400" />
            <span className="text-sm font-medium text-gray-400 w-24">
              Nome:
            </span>
            <span className="text-white">{user.name}</span>
          </div>
          <div className="flex items-center text-lg">
            <Phone className="mr-4 h-5 w-5 shrink-0 text-gray-400" />
            <span className="text-sm font-medium text-gray-400 w-24">
              Telefone:
            </span>
            <span className="text-white">{user.phone}</span>
          </div>
          <div className="flex items-center text-lg">
            <BadgeInfo className="mr-4 h-5 w-5 shrink-0 text-gray-400" />
            <span className="text-sm font-medium text-gray-400 w-24">CPF:</span>
            <span className="text-white">{user.cpf}</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
