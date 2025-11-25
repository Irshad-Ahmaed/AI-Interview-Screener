import { RankValidator } from "../validators/rank.validator.js";
import { llmEvaluate } from "../services/llm.service.js";

export async function rankController(req, res, next) {
  try {
    const result = RankValidator.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        details: result.error.issues
      });
    }


    const { answers } = result.data;

    // Parallel evaluation
    const evalPromises = answers.map((ans) =>
      llmEvaluate(ans).catch((e) => {
        // fallback: if LLM fails
        return { score: 1, summary: "LLM error", improvement: "Retry" };
      })
    );

    const evaluations = await Promise.all(evalPromises);

    // combine and sort
    const combined = answers.map((a, i) => ({ answer: a, ...evaluations[i] }));
    combined.sort((x, y) => y.score - x.score);

    return res.json({ ranked: combined });
  } catch (err) {
    next(err);
  }
}
