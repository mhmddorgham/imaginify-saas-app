import {
  emailExists,
  login,
  signInWithGoogle,
} from "@/lib/actions/user.actions";
import User from "@/lib/database/models/user.model";
import { loginFormSchema } from "@/validations";
import type {
  NextAuthOptions,
  Account,
  AuthOptions,
  DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const parsedCredentials = loginFormSchema.safeParse(credentials);
        try {
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await login({ email, password });
            if (!user) {
              return null;
            }
            console.log("return userss: after pass ", user);
            return user;
          }
        } catch (error: any) {
          throw new Error(error.message ?? "error from server");
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const registeredUser = await signInWithGoogle(user);
        return registeredUser;
      }
      return true;
    },

    async jwt({ token, user, account, session, trigger }) {
      // in login time:
      if (user) {
        token = { ...token, ...user };
      }
      if (account) {
        token.provider = account.provider;
      }
      if (trigger === "update") {
        if (session?.creditBalance) {
          token.creditBalance = session.creditBalance;
        }
        if (session?.planId) {
          token.planId = session.planId;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      // session.user = user;
      // // update user types based on our schema from monogodb:
      // if (user) {
      //   session.user = {
      //     ...session.user,
      //     id: user._id,
      //     email: user.email,
      //     firstName: user.firstName,
      //     lastName: user.lastName,
      //     isPreferencesDone: user.isPreferencesDone,
      //   };
      // }
      // return session;
      console.log("token before returning: inside  async session", token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token._id,
          name: token.firstName + " " + token.lastName,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          isPreferencesDone: token.isPreferencesDone,
          emailVerified: token.emailVerified,
          creditBalance: token.creditBalance,
          planId: token.planId,
        },
      };
    },
  },
  session: {
    // @ts-ignore
    jwt: true,
    maxAge: 24 * 60 * 60,
  },

  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    verifyRequest: "/verify-email",
  },
};
