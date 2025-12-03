"use client";

import PersonalInfos from "@/modules/profile/personal-infos";
import ReservationsSection from "@/modules/profile/reservation/section";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useGetCadastroById } from "@/hooks/react-query/cadastros/use-get-by-id";
import { useEffect } from "react";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetCadastroById(userId as string);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth");
    }
  }, [status]);

  if (status === "loading" || isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError || !user) {
    // Optionally, redirect or show a more specific error message
    return <div>Erro ao carregar os dados do usuário.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="grow py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <PersonalInfos
            user={{
              name: user.nome,
              phone: user.telefone.toString(),
              cpf: user.cpf,
            }}
          />

          <ReservationsSection reservas={user.reservas} />
        </div>
      </main>
    </div>
  );
}
