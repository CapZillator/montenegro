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
        "flex items-center gap-1.5 rounded-sm duration-300",
        "md:px-2 md:py-1 md:border-1 md:border-primary-content md:hover:bg-secondary/40"
      )}
    >
      <Add
        className={classNames(
          "stroke-primary-content w-6 h-6",
          "md:w-4 md:h-4"
        )}
      />
      <span className={classNames("text-sm uppercase hidden", "md:block")}>
        {t("actions.add")}
      </span>
    </LocalizedLink>
  ) : null;
};
