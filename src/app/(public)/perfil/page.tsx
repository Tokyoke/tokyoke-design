import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/auth";
import PersonalInfos from "@/modules/profile/personal-infos";
import ReservationsSection from "@/modules/profile/reservation/section";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  const session = await getServerSession(nextAuthOptions)

  if (!session?.user) {
    redirect('/auth');
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="grow py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <PersonalInfos
            user={{
              name: "João Silva",
              phone: "(11) 91234-5678",
              cpf: "123.456.789-00",
            }}
          />

          <ReservationsSection />
        </div>
      </main>
    </div>
  );
}
