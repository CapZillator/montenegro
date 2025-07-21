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
  },
  external: {
    nominatim: 'https://nominatim.openstreetmap.org',
  },
};

export const queryKeys = {
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
};
