export const sqlFieldTypes = {
  users: {
    contacts: "json",
  },

  residentialPremisesListings: {
    images: "textArray",
    title: "json",
    description: "json",
  },
} as const;
