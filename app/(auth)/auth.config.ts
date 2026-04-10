import type { NextAuthConfig } from "next-auth";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const authConfig = {
  basePath: "/api/auth",
  trustHost: true,
  useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: "__Secure-authjs.session-token",
      options: { httpOnly: true, sameSite: "none" as const, secure: true, path: "/" },
    },
    callbackUrl: {
      name: "__Secure-authjs.callback-url",
      options: { httpOnly: true, sameSite: "none" as const, secure: true, path: "/" },
    },
    csrfToken: {
      name: "__Host-authjs.csrf-token",
      options: { httpOnly: true, sameSite: "none" as const, secure: true, path: "/" },
    },
  },
  pages: {
    signIn: `${base}/login`,
    newUser: `${base}/`,
  },
  providers: [],
  callbacks: {},
} satisfies NextAuthConfig;
