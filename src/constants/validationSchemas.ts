import { z } from "zod";

import { MAX_IMAGES } from "@/components/common/controlled-inputs/image-uploader/constants";
import { ListingType, ResidentialPremisesType } from "@/enums/listing";
import { Messengers } from "@/enums/user";

import { regexPatterns } from "./regexPatterns";

const multilingialText = z
  .record(z.string(), z.string().min(1))
  .refine((value) => Object.values(value).some((val) => val.trim().length > 0));

const contactMethodSchema = z.object({
  type: z.nativeEnum(Messengers),
  contact: z.string().min(1),
});

export const validationSchema = {
  userContacts: z.object({
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(regexPatterns.phone, "Please enter a valid phone number"),
    contacts: z.array(contactMethodSchema).optional(),
  }),

  residentialPremises: z
    .object({
      id: z.string().optional(),
      title: multilingialText,
      description: multilingialText,
      price: z.number().positive(),
      propertyType: z.nativeEnum(ResidentialPremisesType),
      listingType: z.nativeEnum(ListingType),
      rooms: z.number().int().positive(),
      bedrooms: z.number().int().nonnegative(),
      bathrooms: z.number().int().nonnegative(),
      area: z.number().positive(),
      location: z.string().min(1),
      images: z.array(z.string().url()).min(1).max(MAX_IMAGES),
      floor: z.number().int().positive().optional(),
      totalFloors: z.number().int().positive().optional(),
      buildingYear: z.number().int().positive().optional(),
      furnished: z.boolean().optional(),
      balcony: z.number().int().nonnegative().optional(),
      parking: z.boolean().optional(),
      heating: z.string().optional(),
      airConditioner: z.boolean().optional(),
      address: z.string().optional(),
      latitude: z.number().min(-90).max(90).optional(),
      longitude: z.number().min(-180).max(180).optional(),
      deposit: z.number().nonnegative().optional(),
      petsAllowed: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.floor !== undefined && data.totalFloors === undefined) {
          return false;
        }

        return true;
      },
      {
        message: "If floor is provided, totalFloors must also be filled.",
        path: ["totalFloors"],
      }
    )
    .refine(
      (data) => {
        if (data.floor !== undefined && data.totalFloors !== undefined) {
          return data.floor <= data.totalFloors;
        }

        return true;
      },
      {
        message: "Floor number cannot be greater than total floors.",
        path: ["floor"],
      }
    ),
};
