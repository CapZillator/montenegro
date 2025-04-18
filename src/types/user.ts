import { Messengers } from "@/enums/user";

export type UserStatus = {
  id: string;
  needsPhone: boolean;
  status: "existing" | "created";
};

export type UserContacts = {
  phone: string;
  contacts?: Array<{
    type: Messengers;
    contact: string;
  }>;
};
