import { Button } from "@/components/ui/button";
import { Mic, Music } from "lucide-react";
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
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cardapio">Cardápio</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/reservas">Reservas</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/perfil">Perfil</Link>
          </Button>
        </nav>
        <Button className="md:hidden" variant="outline" size="icon">
          <Mic className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
