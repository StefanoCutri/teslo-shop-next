import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {checkUser} from '../../../database'

interface User {
  name: string;
  role: string;
  _id: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Custom loging",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Enter your mail",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const user = await checkUser(email, password);
          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      switch (account?.type) {
        case "oauth":
        // TODO: CREATE USER OR VERIFY

        case "credentials":
          token.user = user;

          break;

        default:
          return token;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
