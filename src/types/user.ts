import { Messengers } from "@/enums/user";

export type UserStatus = {
  id: string;
  needsPhone: boolean;
};

export type UserContacts = {
  phone: string;
  contacts: Array<{
    type: Messengers;
    contact: string;
  }>;
};

export type User = {
  email: string;
  name: string;
  id?: string;
  role?: string;
} & UserContacts;
