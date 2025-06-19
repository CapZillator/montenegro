import { createElement, FC } from "react";
import { getTranslations } from "next-intl/server";
import classNames from "classnames";

import { BENEFIT_ENTRIES_MAP } from "./constants";

type BenefitKey = keyof typeof BENEFIT_ENTRIES_MAP;

type Props = {
    benefits: string[];
};

export const AdditionalBenefits: FC<Props> = async ({
    benefits
}) => {
    const t = await getTranslations();

    return (
        <>
            <h3 className={classNames("my-1 text-lg font-semibold")}>{t("listings.features")}</h3>
            <div className={classNames("flex flex-wrap gap-2")}>
                {(benefits as BenefitKey[]).map((benefit) => <div key={benefit} className={classNames("flex items-center gap-2 px-3 py-1.5 bg-primary border-1 border-solid border-divider/25 rounded-md")}>
                    {createElement(BENEFIT_ENTRIES_MAP[benefit].icon, { className: "w-4 h-4 lg:w-5 lg:h-5 fill-primary-content stroke-primary-content" })}
                    <span className="text-sm lg:text-base">{t(BENEFIT_ENTRIES_MAP[benefit].i18nKey)}</span>
                </div>)}
            </div>
        </>
    );
};