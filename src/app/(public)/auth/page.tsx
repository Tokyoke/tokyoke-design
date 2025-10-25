"use client";


import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "@/modules/auth/sign-in";
import SignUp from "@/modules/auth/sign-up";

export default function AuthPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="grow py-12 md:py-20">
        <div className="container mx-auto max-w-md px-4 md:px-6">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-900">
              <TabsTrigger
                value="signin"
                className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
              >
                Entrar
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
              >
                Registrar
              </TabsTrigger>
            </TabsList>

            <SignIn />

            <SignUp />
          </Tabs>
        </div>
      </main>
    </div>
  );
}
