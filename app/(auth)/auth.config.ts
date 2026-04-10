import type { NextAuthConfig } from "next-auth";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const authConfig = {
  basePath: "/api/auth",
  trustHost: true,
  useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: "__Secure-authjs.session-token",
      options: { httpOnly: true, sameSite: "none" as const, secure: true, path: "/", partitioned: true },
    },
    callbackUrl: {
      name: "__Secure-authjs.callback-url",
      options: { httpOnly: true, sameSite: "none" as const, secure: true, path: "/", partitioned: true },
    },
    csrfToken: {
      name: "__Secure-authjs.csrf-token",
      options: { httpOnly: true, sameSite: "none" as const, secure: true, path: "/", partitioned: true },
    },
  },
  pages: {
    signIn: `${base}/login`,
    newUser: `${base}/`,
  },
  providers: [],
  callbacks: {},
} satisfies NextAuthConfig;
