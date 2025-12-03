import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const signInUrl = "http://127.0.0.1:5000/cadastros/login";

          const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              senha: credentials.password, // Certifique-se que seu back espera 'senha' ou 'password'
            }),
          });

          if (!response.ok) {
            console.error("[NextAuth] authorize error", response.statusText);
            return null;
          }

          const backendResponse = await response.json();
          console.log("Backend response:", backendResponse);

          // CORREÇÃO 1: Mapear exatamente como vem do JSON do backend
          if (backendResponse && backendResponse.user) {
            return {
              id: String(backendResponse.user.id), // Converta ID para string por segurança
              name: backendResponse.user.name, // Backend envia minúsculo 'name'
              email: backendResponse.user.email, // Backend envia minúsculo 'email'
              role: backendResponse.user.role, // Backend envia minúsculo 'role'
              cpf: backendResponse.user.cpf,
              phone: backendResponse.user.telefone
            };
          }

          return null;
        } catch (error) {
          console.error("[NextAuth] authorize error", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 horas
  },
  // CORREÇÃO 2: Adicionar callbacks para persistir os dados na sessão
  callbacks: {
    async jwt({ token, user }) {
      // O 'user' só existe na primeira vez que o token é criado (login)
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Passa os dados do token para a sessão do frontend
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
};
