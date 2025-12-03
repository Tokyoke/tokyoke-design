import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        cpf: { label: "cpf", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.cpf || !credentials?.password) {
            return null;
          }

          const signInUrl = `${process.env.API_URL}/auth/sign-in`;

          const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cpf: credentials.cpf,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            console.error("[NextAuth] authorize error", response.statusText);
            return null;
          }

          const backendResponse = await response.json();
          console.log("Backend response:", backendResponse);

          if (backendResponse && backendResponse.token && backendResponse.user) {
            // Adapt the backend user object to what NextAuth expects
            // Backend user: idCadastro, Nome, CPF, Endereco
            // NextAuth user: id, name, email
            return {
              id: backendResponse.user.idCadastro,
              name: backendResponse.user.Nome,
              email: backendResponse.user.CPF, // Using CPF as email
              token: backendResponse.token,
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
    signIn: "/auth", // Assuming the login page is at /auth
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 horas
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email, // This will be the CPF
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user.id = token.user.id;
        session.user.name = token.user.name;
        session.user.email = token.user.email; // This will be the CPF
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
