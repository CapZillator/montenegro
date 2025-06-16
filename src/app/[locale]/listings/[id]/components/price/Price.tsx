import { FC } from "react";
import { getTranslations } from "next-intl/server";
import classNames from "classnames";

import { formatNumberToFinancialAmount } from "@/formatters/finance";

type Props = {
price: number;
area: number;
}

export const Price: FC<Props> = async ({
    price,
  area,
}) => {
      const t = await getTranslations();
    const pricePerUnit = Math.round(price / area);

    return (
    <div>
        <p className={classNames("font-semibold", "lg:text-lg")}>{formatNumberToFinancialAmount(price)} €</p>
        {pricePerUnit ? <p className="text-sm">1 {t("measures.m")}<sup>2</sup> - {formatNumberToFinancialAmount(pricePerUnit)} €</p> : null}
    </div>
  );
};
