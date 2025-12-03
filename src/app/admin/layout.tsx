import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  Home,
  LogOut,
  Music,
  Salad,
  Users,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { nextAuthOptions } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions)

  if (!session?.user || session?.user?.role !== "ADMIN") {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <aside className="sticky top-0 h-screen w-64 border-r border-gray-800 bg-gray-950 p-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 py-4 mb-4">
          <Music className="h-6 w-6 text-red-500" />
          <span className="text-xl font-bold tracking-tight">
            TOKYOKÊ
            <span className="text-red-500 font-normal ml-1">Admin</span>
          </span>
        </div>
        <nav className="flex flex-col gap-2 grow">
          <Button
            variant="ghost"
            className="justify-start text-base data-[active=true]:bg-gray-800 data-[active=true]:text-red-400"
            asChild
          // Implementar lógica de rota ativa (data-[active=true])
          >
            <Link href="/admin">
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-base data-[active=true]:bg-gray-800 data-[active=true]:text-red-400"
            asChild
          >
            <Link href="/admin/reservas">
              <Calendar className="mr-2 h-5 w-5" />
              Reservas
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-base data-[active=true]:bg-gray-800 data-[active=true]:text-red-400"
            asChild
          >
            <Link href="/admin/cardapio">
              <Salad className="mr-2 h-5 w-5" />
              Cardápio
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-base data-[active=true]:bg-gray-800 data-[active=true]:text-red-400"
            asChild
          >
            <Link href="/admin/usuarios">
              <Users className="mr-2 h-5 w-5" />
              Usuários
            </Link>
          </Button>
        </nav>
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start text-base text-black"
            asChild
          >
            <Link href="/" className="text-white">
              <LogOut className="mr-2 h-5 w-5 text-red-500" />
              Voltar ao site
            </Link>
          </Button>
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-40 h-16 border-b border-gray-800 bg-black/80 backdrop-blur-lg flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Painel Administrativo</h1>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
