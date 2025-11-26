import { Button } from "@/components/ui/button";
import { BookTextIcon, HomeIcon, MenuIcon, Music, RefrigeratorIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b text-white bg-black backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-red-500" />
          <span className="text-xl font-bold tracking-tight">TOKYOKÊ</span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/" className="hover:text-red-500">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cardapio" className="hover:text-red-500">Cardápio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/reservas" className="hover:text-red-500">Reservas</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/perfil" className="hover:text-red-500">Perfil</Link>
          </Button>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden bg-white p-2 rounded-sm hover:cursor-pointer hover:bg-white/80">
            <MenuIcon className="h-5 w-5 text-red-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-0 rounded-sm">
            <DropdownMenuItem>
              <Link
                href="/"
                className="text-red-500 font-bold -tracking-tight uppercase hover:underline flex items-center"
              >
                <HomeIcon className="inline-block mr-1.5 text-red-500" />
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/cardapio"
                className="text-red-500 font-bold -tracking-tight uppercase hover:underline flex items-center"
              >
                <RefrigeratorIcon className="inline-block mr-1.5 text-red-500" />
                Cardápio
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/reservas"
                className="text-red-500 font-bold -tracking-tight uppercase hover:underline flex items-center"
              >
                <BookTextIcon className="inline-block mr-1.5 text-red-500" />
                Reservas
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/perfil"
                className="text-red-500 font-bold -tracking-tight uppercase hover:underline flex items-center"
              >
                <UserIcon className="inline-block mr-1.5 text-red-500" />
                Perfil
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
