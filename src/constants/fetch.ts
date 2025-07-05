export const fetchPaths = {
  internal: {
    user: {
      LISTINGS: '/api/user/listings',
      PROFILE: '/api/user',
      CHECK_USER: '/api/user/check',
      UPDATE_USER_CONTACT: '/api/user/contact',
    },
    image: {
      MANAGE_LISTING_IMAGE: '/api/image',
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
