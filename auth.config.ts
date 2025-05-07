import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { createUserIfNotExists, getUserIdByProviderAccount } from "@/lib/db";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt", // храним сессию в токене
  },

  callbacks: {
    // 1. При логине: ищем или создаём пользователя, сохраняем userId
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const provider = account.provider;
        const providerAccountId = account.providerAccountId;

        // 1.1 Проверяем — есть ли такой аккаунт
        let userId = await getUserIdByProviderAccount(
          provider,
          providerAccountId
        );

        // 1.2 Если нет — создаём пользователя
        if (!userId) {
          userId = await createUserIfNotExists({
            provider,
            providerAccountId,
            email: profile.email!,
            name: profile.name,
            image: profile.picture,
          });
        }

        token.userId = userId;
      }

      return token;
    },

    // 2. Добавляем userId в session.user
    async session({ session, token }) {
      if (token?.userId) {
        session.user.id = token.userId as string;
      }

      return session;
    },
  },
};
