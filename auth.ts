import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { DefaultSession } from "next-auth";
import { apiLinks, clientLinks, httpClient } from "./src/utils";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
      emailVerified?: boolean;
    } & DefaultSession["user"];
    needsAdditionalInfo?: boolean;
    tempGoogleId?: string;
    tempemail?: string;
    tempname?: string;
    tempimage?: string;
    error?: string;
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
        try {
          const response = await httpClient.post({
            url: apiLinks.user.signin,
            data: {
              login: credentials.email,
              password: credentials.password,
            },
          });

          const user = response.data;
          console.log('auth.ts - user:', {user})

          if (!user || !user.accessToken) {
            throw new Error("Invalid credentials or missing access token.");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
            image: user.picture || user.image,
            emailVerified: user.emailVerified,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        if (account.provider === "google") {
          try {
            const response = await httpClient.post({
              url: clientLinks.email.googleSignin,
              data: {
                googleID: account.providerAccountId
              },
            });

            const userData = response.data;
            console.log("Google sign-in response:", userData);
            if (response.status === 200 && userData?.ok === true) {
              token.accessToken = userData.data.accessToken;
              token.id = userData.data.id;
              token.picture = userData.data.picture;
              token.emailVerified = userData.data.emailVerified;
              token.needsAdditionalInfo = false;

              // Dispatch custom event for successful Google sign-in
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("googleSignInSuccess", { 
                  detail: { 
                    accessToken: userData.data.accessToken,
                    id: userData.data.id,
                  }
                }));
              }
            } else {
              token.needsAdditionalInfo = true;
              token.tempGoogleId = account.providerAccountId;
              token.tempemail = user.email || "";
              token.tempname = user.name || "";
              token.tempimage = user.image || "";
            }
          } catch (error) {
            console.error("Google sign-in error:", error);
            token.error = "Failed to authenticate with Google";
          }
        } else {
          token.accessToken = user.accessToken;
          token.id = user.id;
          token.emailVerified = user.emailVerified;
          token.picture = user.image;
        }
      }

      return token;
    },

    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        try {
          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

async session({ session, token }) {
  if (!token.needsAdditionalInfo) {
    session.user = {
      id: token.id as string,
      name: token.name as string,
      email: token.email as string,
      accessToken: token.accessToken as string,
      image: token.picture as string,
      emailVerified: token.emailVerified as boolean,
    };

    try {
      // Fetch the cart data after the session is created
      if (token.accessToken) {
        console.log(token.accessToken)
        const cartResponse = await httpClient.get({
          url: clientLinks.cart.cart, // Replace with your cart API endpoint
          headers: {
            Authorization: `${token.accessToken}`,
          },
        });

        const cartData = cartResponse.data;

        // Dispatch custom event to update Redux store
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("cartFetched", { detail: { cart: cartData } })
          );
        }
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  } else {
    delete session.user;
  }

  if (token.needsAdditionalInfo) {
    session.needsAdditionalInfo = true;
    session.tempGoogleId = token.tempGoogleId;
    session.tempemail = token.tempemail || "";
    session.tempname = token.tempname || "";
    session.tempimage = token.tempimage || "";
  }

  if (token.error) {
    session.error = token.error;
  }

  return session;
}

  },

  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },
});