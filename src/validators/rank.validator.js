import { z } from "zod";

export const RankValidator = z.object({
  answers: z.array(z.string().min(1)).min(10, {
    message: "You must provide at least 10 answers to rank.",
  })
});
