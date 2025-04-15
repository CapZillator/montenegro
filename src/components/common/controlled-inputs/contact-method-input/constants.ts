import { Messengers } from "@/enums/user";

export const MESSENGER_OPTIONS: { name: string; value: Messengers }[] = [
  { name: "Telegram", value: Messengers.TELEGRAM },
  { name: "WhatsApp", value: Messengers.WHATSAPP },
  { name: "Viber", value: Messengers.VIBER },
];
