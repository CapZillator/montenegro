import { auth0 } from "@/lib/auth0";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Home() {
  const session = await auth0.getSession();
  const t = await getTranslations("welcome");

  if (!session) {
    return (
      <main>
        <Link href={"/auth/login?screen_hint=signup"}>Sign up</Link>
        <Link href={"/auth/login"}>Log in</Link>
      </main>
    );
  }

  return (
    <main className="p-5 flex flex-col items-center justify-center gap-2">
      <h1>Welcome, {session.user.name}!</h1>
      <h2>{t("hi")}</h2>
    </main>
  );
}
