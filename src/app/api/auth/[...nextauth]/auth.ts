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
          const signInUrl = `${process.env.API_URL}/auth/sign-in`;

          const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            console.error("[NextAuth] authorize error", response.statusText);
            return null;
          }

          const backendResponse = await response.json();
          console.log("Backend response:", backendResponse);

          if (backendResponse && backendResponse.token && backendResponse.user) {
            return {
              id: backendResponse.user.id,
              name: backendResponse.user.name,
              email: backendResponse.user.email,
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
    signIn: "/login",
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
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user.id = token.user.id;
        session.user.name = token.user.name;
        session.user.email = token.user.email;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

// console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
