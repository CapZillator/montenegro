import { AirConditioner } from "@/components/common/icons/realty/AirConditioner";
import { Armchair } from "@/components/common/icons/realty/Armchair";
import { Parking } from "@/components/common/icons/realty/Parking";
import { Pets } from "@/components/common/icons/realty/Pets";

export const BENEFIT_ENTRIES_MAP = {
    "parking": {
        i18nKey: "listings.properties.parking",
        icon: Parking,
    },
    "petsAllowed": {
        i18nKey: "listings.benefits.pets",
        icon: Pets,
    },
    "airConditioner": {
        i18nKey: "listings.properties.ac",
        icon: AirConditioner,
    },
    "furnished": {
        i18nKey: "listings.properties.furnished",
        icon: Armchair
    },
}