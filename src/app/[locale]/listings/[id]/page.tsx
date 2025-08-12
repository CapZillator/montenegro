import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import classNames from 'classnames';
import { LatLngTuple } from 'leaflet';

import { getListingById } from '@/utils/db/listings';
import { getLocalizedStringValue } from '@/utils/listings';

import { AdditionalBenefits } from './components/additional-benefits/AdditionalBenefits';
import { Address } from './components/addresse/Address';
import { Description } from './components/description/Description';
import { Gallery } from './components/gallery/Gallery';
import { Map } from './components/map/Map';
import { Meta } from './components/meta/Meta';
import { Nearby } from './components/nearby/Nearby';
import { Owner } from './components/owner/Owner';
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

  const location = [listing.latitude, listing.longitude] as LatLngTuple;

  return (
    <div
      className={classNames(
        'w-full space-y-2 ',
        'lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0',
        'xl:max-w-container-md xl:mx-auto'
      )}
    >
      <div className={classNames('order-1', 'lg:col-span-3')}>
        <h1 className={classNames('font-semibold text-xl', 'lg:text-2xl')}>
          {getLocalizedStringValue(listing.title, locale)}
        </h1>
      </div>

      <div className={classNames('order-2', 'lg:col-span-2')}>
        <Meta
          price={listing.price}
          area={listing.area}
          date={listing.updatedAt ?? listing.createdAt}
        />
      </div>

      <div className={classNames('order-3', 'lg:col-span-2 lg:order-4')}>
        <Gallery images={listing.images} />
      </div>

      <div className={classNames('order-4', 'lg:col-span-2 lg:order-6')}>
        <Summary {...listing} />
      </div>

      {additionalBenefits.length ? (
        <div className={classNames('order-5', 'lg:col-span-2 lg:order-7')}>
          <AdditionalBenefits benefits={additionalBenefits} />
        </div>
      ) : null}

      <div
        className={classNames('order-6', 'lg:col-span-2', {
          'lg:order-9': additionalBenefits.length,
          'lg:order-7': !additionalBenefits.length,
        })}
      >
        <Description text={listing.description} locale={locale} />
      </div>

      <div className={classNames('order-7', 'lg:order-3 lg:self-end')}>
        <Address location={listing.location} address={listing.address} />
      </div>

      <div
        className={classNames(
          'w-full aspect-square relative z-10 border-solid border-divider/25 border-1 rounded-lg overflow-hidden order-8',
          'lg:row-span-2 lg:h-full lg:aspect-auto lg:order-5'
        )}
      >
        <Map className={classNames('w-full h-full')} location={location} />
      </div>

      <div className={classNames('order-9', 'lg:order-8 lg:row-span-3')}>
        {listing.nearbyAmenities?.length ? (
          <Nearby data={listing.nearbyAmenities} />
        ) : null}
      </div>

      <div className={classNames('order-10', 'lg:col-span-2')}>
        <Owner userId={listing.userId} />
      </div>
    </div>
  );
}
