import { EvaluateValidator } from "../validators/evaluate.validator.js";
import { llmEvaluate } from "../services/llm.service.js";

export async function evaluateController(req, res, next) {
  try {
    const result = EvaluateValidator.safeParse(req.body);
    console.log('result', result);

    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { answer } = result.data;

    // Call LLM scoring service
    const evalResult = await llmEvaluate(answer);

    return res.json(evalResult);

  } catch (err) {
    next(err);
  }
}
