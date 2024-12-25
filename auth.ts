import Credentials from "next-auth/providers/credentials";
import NextAuth, { DefaultSession } from "next-auth";
import { apiLinks, httpClient } from "./src/utils";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  accessToken?: string | null;
  emailVerified?: boolean; // Thêm trường này
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
      emailVerified?: boolean; // Thêm trường này
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await httpClient.post({
          url: apiLinks.user.signin,
          data: {
            login: credentials.email,
            password: credentials.password,
          },
        });

        const user = response.data;

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
          image: user.picture,
          emailVerified: user.emailVerified, // Thêm trường này
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.picture = user.image;
        token.emailVerified = user.emailVerified; // Thêm trường này
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        accessToken: token.accessToken,
        image: token.picture,
        emailVerified: token.emailVerified, // Thêm trường này
      };
      return session;
    },
  },
});

