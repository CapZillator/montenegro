export const fetchPaths = {
  internal: {
    user: {
      LISTINGS: "/api/user/listings",
      PROFILE: "/api/user",
      CHECK_USER: "/api/user/check",
      UPDATE_USER_CONTACT: "/api/user/contact",
    },
    image: {
      MANAGE_LISTING_IMAGE: "/api/image",
    },
  },
};

export const queryKeys = {
  listings: {
    userListings: "userListings",
  },
  user: {
    status: "userStatus",
    data: "userData",
  },
};
