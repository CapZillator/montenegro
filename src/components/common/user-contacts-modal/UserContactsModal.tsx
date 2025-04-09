"use client";

import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactMethodInput } from "@/components/common/controlled-inputs/contact-method-input/ContactMethodInput";
import { PhoneInput } from "@/components/common/controlled-inputs/phone-input/PhoneInput";
import { GenericModal } from "@/components/common/generic-modal/GenericModal";
import { validationSchema } from "@/constants/validationSchemas";
import { useCurrentUser } from "@/hooks/use-current-user/useCurrentUser";
import { useToast } from "@/hooks/use-toast/useToast";

import { Button } from "../button/Button";
import { ButtonIcon } from "../button/enums";
import { MessengerType } from "../controlled-inputs/contact-method-input/ContactMethodInput";
import { Contacts } from "../icons/user/Contacts";
import { Phone } from "../icons/user/Phone";

type FormData = {
  phone: string;
  contacts?: Array<{
    type: MessengerType;
    contact: string;
  }>;
};

export const UserContactsModal: FC = () => {
  const { data: userData } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(true);
  const { showToast } = useToast();
  const t = useTranslations();
  const needsContacts = userData?.needsPhone ?? false;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema.userContacts),
    mode: "onChange",
    defaultValues: {
      contacts: [],
    },
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement API call to update user contacts
      console.log("Form data:", data);
      showToast("Contact information updated", "success");
      handleClose();
    } catch (error) {
      showToast("Failed to update contact information", "error");
    }
  };

  if (!needsContacts || !isOpen) return null;

  return (
    <GenericModal id="user-contacts" onClose={handleClose}>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{t("user.addContactHeader")}</h2>
        <p className="mb-4">{t("user.addContactIntro")}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PhoneInput
            name="phone"
            control={control}
            label={t("user.phone")}
            placeholder="+123 4567 890"
            disabled={isSubmitting}
            icon={<Phone className="w-5 h-5 fill-primary-content" />}
            containerStyles="mb-4"
          />
          <ContactMethodInput
            control={control}
            label={t("user.additionalContacts")}
            disabled={isSubmitting}
            icon={<Contacts className="w-6 h-6 stroke-primary-content" />}
            submitButton={
              <Button
                type="submit"
                disabled={isSubmitting}
                icon={ButtonIcon.SAVE}
                iconClassName="stroke-primary"
              >
                <span>{t("actions.save")}</span>
              </Button>
            }
          />
        </form>
      </div>
    </GenericModal>
  );
};
