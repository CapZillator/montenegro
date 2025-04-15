import { Messengers } from "@/enums/user";

export type ContactMethod = {
  type: Messengers;
  contact: string;
};
