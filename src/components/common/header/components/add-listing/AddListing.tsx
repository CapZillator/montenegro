import { FC } from "react";
import { useSession } from "next-auth/react";
import classNames from "classnames";

import { Add } from "@/components/common/icons/actions/Add";
import { LocalizedLink } from "@/components/localized-link/LokalizedLink";
import { navigationPaths } from "@/constants/navigation";
import { useTranslation } from "@/hooks/use-translation/useTranslation";

export const AddListing: FC = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();

  return session ? (
    <LocalizedLink
      href={navigationPaths.listings.ADD}
      className={classNames(
        "group flex items-center gap-1 rounded-sm duration-300 border-2 border-primary-content",
        "md:pr-3 md:pl-1 md:py-1 md:hover:bg-primary-content md:border-1"
      )}
    >
      <Add
        className={classNames(
          "stroke-primary-content w-6 h-6 duration-300 group-hover:stroke-primary"
        )}
      />
      <span
        className={classNames(
          "text-sm uppercase hidden duration-300",
          "md:block md:group-hover:text-primary"
        )}
      >
        {t("actions.add")}
      </span>
    </LocalizedLink>
  ) : null;
};
