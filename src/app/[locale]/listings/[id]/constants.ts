import { z } from "zod";

export const ParamsSchema = z.object({
  id: z.string().uuid(),
});
