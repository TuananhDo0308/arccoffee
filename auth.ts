import Credentials from "next-auth/providers/credentials";
import NextAuth, { DefaultSession } from "next-auth";
import { apiLinks, httpClient } from "./src/utils";
interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    accessToken?: string|null
  }
interface props{
    session:any
    token:any
}


declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
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
          accessToken: user.accessToken,
          image: user.picture,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token on login
      if (user) {
        const temp = user as User
        token.accessToken = temp.accessToken;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }:props) {
      // Add token info to session

      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        image: token.picture,
      };
      return session;
    },
  },
});
