export const FETCH_PATHS = {
  internal: {
    user: {
      listings: '/api/user/listings',
      listingStatus: '/api/user/listings/status',
      profile: '/api/user',
      checkUser: '/api/user/check',
      updateUserContact: '/api/user/contact',
    },
    image: {
      manageListingImages: '/api/image',
    },
    geo: {
      geocode: '/api/geo/geocode',
    },
    currency: {
      exchangeRates: '/api/currency',
    },
  },
  external: {
    nominatim: 'https://nominatim.openstreetmap.org',
    exchangeRates: 'https://api.exchangerate.host',
  },
};

export const QUERY_KEYS = {
  listings: {
    userListings: 'userListings',
  },
  user: {
    status: 'userStatus',
    data: 'userData',
  },
  geo: {
    geocode: 'geocode',
  },
  currency: {
    exchangeRates: 'exchangeRates',
  },
};
