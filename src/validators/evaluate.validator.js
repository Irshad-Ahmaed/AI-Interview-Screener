import { z } from "zod";

export const EvaluateValidator = z.object({
  answer: z.string().min(10)
});
