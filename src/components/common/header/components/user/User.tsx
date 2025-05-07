import { forwardRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import classNames from "classnames";

import { Login } from "@/components/common/icons/actions/Login";
import { Logout } from "@/components/common/icons/actions/Logout";
import { List } from "@/components/common/icons/List";
import { Profile } from "@/components/common/icons/user/Profile";
import { LocalizedLink } from "@/components/localized-link/LokalizedLink";
import { navigationPaths } from "@/constants/navigation";
import { useTranslation } from "@/hooks/use-translation/useTranslation";

import { Dropdown } from "../dropdown/Dropdown";

type Props = {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
};

export const User = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, onToggle }, ref) => {
    const { data: session } = useSession();
    const { t } = useTranslation();
    const userNameShort = session?.user?.name ? session?.user?.name[0] : "?";

    const onClose = () => onToggle(false);
    const onLogOut = () => {
      onClose();
      signOut({ callbackUrl: "/" });
    };

    console.log("42U", session);

    return (
      <>
        {session ? (
          <Dropdown
            ref={ref}
            buttonChildren={
              <div
                className={classNames(
                  "w-8 h-8 flex justify-center items-center text-primary bg-secondary-content rounded-full"
                )}
              >
                <span className="capitalize">{userNameShort}</span>
              </div>
            }
            menuChildren={
              <>
                <li>
                  <LocalizedLink
                    href={navigationPaths.user.PROFILE}
                    className={classNames(
                      "flex items-center gap-1.5 duration-300 hover:text-secondary-content whitespace-nowrap"
                    )}
                    onClick={onClose}
                  >
                    <Profile className="w-4 h-4 fill-primary-content" />
                    <span>{t("user.profile")}</span>
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink
                    href={navigationPaths.LISTING_ADMIN}
                    className={classNames(
                      "flex items-center gap-1.5 duration-300 hover:text-secondary-content whitespace-nowrap"
                    )}
                    onClick={onClose}
                  >
                    <List className="w-4 h-4 fill-primary-content" />
                    <span>{t("user.myListings")}</span>
                  </LocalizedLink>
                </li>
                <li>
                  <button
                    className={classNames(
                      "flex items-center gap-1.5 duration-300 hover:text-secondary-content whitespace-nowrap"
                    )}
                    onClick={onLogOut}
                  >
                    <Logout className="w-4 h-4 stroke-primary-content" />
                    <span>{t("actions.logout")}</span>
                  </button>
                </li>
              </>
            }
            {...{ isOpen, onToggle }}
          />
        ) : (
          <button
            className={classNames(
              "group flex items-center gap-1.5 p-1 cursor-pointer"
            )}
            onClick={() => signIn("google")}
          >
            <Login
              className={classNames(
                "w-4 h-4 stroke-primary-content duration-300"
              )}
            />
            <span
              className={classNames(
                "duration-300 group-hover:text-secondary-content"
              )}
            >
              {t("actions.login")}
            </span>
          </button>
        )}
      </>
    );
  }
);

User.displayName = "User";
