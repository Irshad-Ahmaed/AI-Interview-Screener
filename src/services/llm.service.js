import axios from "axios";

function extractJson(text) {
  if (!text) return null;
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) return null;
  const jsonStr = text.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    try {
      const repaired = jsonStr.replace(/(["']?)\s*(\w+)\s*\1\s*:/g, '"$2":').replace(/'/g, '"');
      return JSON.parse(repaired);
    } catch (err2) {
      return null;
    }
  }
}

function buildPrompt(answer) {
  return `
You are an objective interview evaluator. Score the candidate's answer on a scale of 1 (worst) to 5 (best).
Return ONLY a JSON object with keys exactly: score, summary, improvement.

- score: integer 1-5
- summary: one-line summary (max ~20 words)
- improvement: one concrete improvement suggestion

Candidate answer:
"${answer}"
`;
}

// Calling groq for score result
async function callGroq(prompt) {
  const url = process.env.GROQ_API_URL;
  const key = process.env.GROQ_API_KEY;
  if (!url || !key) throw new Error("LLM provider not configured (GROQ_API_URL/GROQ_API_KEY)");

  const body = {
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    max_tokens: 200
  };

  const resp = await axios.post(`${url}/chat/completions`, body, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    timeout: 20000
  });

  if (resp.data?.choices && resp.data.choices[0]?.message?.content) {
    console.log("choice message content")
    return resp.data.choices[0].message.content;
  }
  // else return raw
  return JSON.stringify(resp.data);
}

// Base function
export async function llmEvaluate(answer) {
  const prompt = buildPrompt(answer);

  // call LLM
  const raw = await callGroq(prompt);

  // extract JSON
  const parsed = extractJson(raw);

  if (!parsed) {
    throw new Error("Failed to parse LLM JSON response");
  }

  // sanitize and enforce types
  let score = parseInt(parsed.score, 10);
  if (isNaN(score) || score < 1) score = 1;
  if (score > 5) score = 5;

  const summary = (parsed.summary || "").toString().slice(0, 250);
  const improvement = (parsed.improvement || "").toString().slice(0, 500);

  return { score, summary, improvement };
}
