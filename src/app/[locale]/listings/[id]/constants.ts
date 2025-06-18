import { z } from "zod";

export const ParamsSchema = z.object({
  id: z.string().uuid(),
});

export const ADDITIONAL_BENEFIT_NAMES = [
  "parking",
  "petsAllowed",
  "airConditioner",
  "furnished"
];