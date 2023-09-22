import { authConfig } from "@/app/auth/auth";
import NextAuth from "next-auth/next";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
