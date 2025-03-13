import { useRouter } from "next/router";

export default function LocaleSwitcher() {
  const router = useRouter();
  
  return (
    <div>
      <button
        onClick={() =>
          router.push(router.pathname, router.asPath, { locale: "en" })
        }
      >
        EN
      </button>
      <button
        onClick={() =>
          router.push(router.pathname, router.asPath, { locale: "ru" })
        }
      >
        RU
      </button>
    </div>
  );
}
