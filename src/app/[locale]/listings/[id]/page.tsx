import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import classNames from 'classnames';

import { getListingById } from '@/utils/db/listings';
import { getLocalizedStringValue } from '@/utils/listings';

import { AdditionalBenefits } from './components/additional-benefits/AdditionalBenefits';
import { Description } from './components/description/Description';
import { Gallery } from './components/gallery/Gallery';
import { Owner } from './components/owner/Owner';
import { Price } from './components/price/Price';
import { Summary } from './components/summary/Summary';
import { ADDITIONAL_BENEFIT_NAMES, ParamsSchema } from './constants';

export default async function ListingPage({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const parseResult = ParamsSchema.safeParse(resolvedParams);
  const locale = await getLocale();

  if (!parseResult.success) {
    notFound();
  }

  const listing = await getListingById(parseResult.data.id);

  if (!listing) {
    notFound();
  }

  const additionalBenefits = Object.entries(listing)
    .filter((entry) => ADDITIONAL_BENEFIT_NAMES.includes(entry[0]) && entry[1])
    .map((entry) => entry[0]);

  return (
    <div
      className={classNames(
        'w-full space-y-2 ',
        'lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0',
        'xl:max-w-container-md xl:mx-auto'
      )}
    >
      <div className={classNames('lg:col-span-3')}>
        <h1 className={classNames('font-semibold text-xl', 'lg:text-2xl')}>
          {getLocalizedStringValue(listing.title, locale)}
        </h1>
      </div>
      <div className={classNames('lg:col-span-2')}>
        <Price price={listing.price} area={listing.area} />
      </div>
      <div className={classNames('hidden', 'lg:block')}>
        <Owner userId={listing.userId} />
      </div>
      <div className={classNames('lg:col-span-2')}>
        <Gallery images={listing.images} />
      </div>
      <div className={classNames('lg:col-span-2')}>
        <Summary {...listing} />
      </div>
      <div className={classNames('lg:hidden')}>
        <Owner userId={listing.userId} />
      </div>
      <div className={classNames('lg:col-span-2')}>
        <AdditionalBenefits benefits={additionalBenefits} />
      </div>
      <div className={classNames('lg:col-span-2')}>
        <Description text={listing.description} locale={locale} />
      </div>
    </div>
  );
}
