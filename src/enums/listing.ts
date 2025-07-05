export enum ResidentialPremisesType {
  APARTMENT = 'apartment',
  STUDIO = 'studio',
  HOUSE = 'house',
  TOWNHOUSE = 'townhouse',
  DUPLEX_TRIPLEX = 'duplexTriplex',
  VILLA = 'villa',
  ROOM = 'room',
}

export enum ListingType {
  SALE = 'sale',
  LONG_TERM_RENT = 'longTermRent',
}

export enum ListingState {
  ACTIVE = 1,
  PAUSED = 2,
  DELETED = 3,
  DRAFT = 4,
  PENDING_APPROVAL = 5,
}
