import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-gray-800 bg-black py-12">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 text-center text-gray-400 md:grid-cols-3 md:px-6 md:text-left">
        <div>
          <h4 className="text-lg font-semibold text-white">
            Tokyokê | Karaokê & Diversão
          </h4>
          <p className="mt-2 text-sm">Onde a música encontra sua voz!</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">Localização</h4>
          <p className="mt-2 text-sm">
            Travessa Nippon, 18 - Liberdade,
            <br />
            São Paulo - SP
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">Contato</h4>
          <div className="mt-2 flex flex-col items-center gap-2 md:items-start">
            <a
              href="tel:11982345617"
              className="flex items-center gap-2 text-sm transition-colors hover:text-red-500"
            >
              <Phone className="h-4 w-4" />
              (11) 98234-5617
            </a>
            <a
              href="mailto:atendimento@tokyoke.com.br"
              className="flex items-center gap-2 text-sm transition-colors hover:text-red-500"
            >
              <Mail className="h-4 w-4" />
              atendimento@tokyoke.com.br
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm transition-colors hover:text-red-500"
            >
              <Instagram className="h-4 w-4" />
              @TokyokeSP
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Tokyokê. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
