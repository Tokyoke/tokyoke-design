import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"; // Importe isso

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    cpf: string;
    phone: string;
  }
}

// Adicione essa parte para o Token
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: "USER" | "ADMIN";
    cpf: string;
    phone: string;
    name: string;
  }
}
