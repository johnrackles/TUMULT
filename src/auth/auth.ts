import { db } from "@/db/db";
import { env } from "@/env.mjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      return { ...session, user: { ...session.user, id: user.id } };
    },
  },
};
