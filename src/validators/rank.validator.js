import { z } from "zod";

export const RankValidator = z.object({
  answers: z.array(z.string().min(1)).min(2, {
    message: "You must provide at least 2 answers to rank.",
  })
});
