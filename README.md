# AI Interview Screener (Node.js + Express)

A minimal backend that evaluates candidate answers using an LLM and ranks candidates answers.

## Features

- POST /api/evaluate-answer → Evaluate single answer (returns { score, summary, improvement })
- POST /api/rank-candidates → Evaluate multiple in parallel, return ranked results

---

## Why Node.js Instead of Python (FastAPI)

- Node.js is optimized for high-volume, non-blocking I/O operations.
- Result: faster concurrent LLM requests and better scalability.
- Express gives extremely lightweight API routing.
- Node.js runs easily on platforms like Vercel, Railway, Render, Cloudflare Workers, etc.
- For a small LLM evaluation service that focuses on HTTP calls, speed, and rapid delivery,
- Node.js provides the best balance of performance, simplicity, and startup-style engineering.

## Quick start

1. Clone repo

```
git clone https://github.com/Irshad-Ahmaed/AI-Interview-Screener.git
cd AI-Interview-Screener
```

2. Environment variables:

   - `GROQ_API_KEY` and `GROQ_API_URL` (or your chosen LLM provider)

3. Install:

```
npm install
```

4. Start dev server:

```
npm run dev
```

6. API endpoints:

- POST `http://localhost:4000/api/evaluate-answer`
  Body: `{ "answer": "Candidate says: ..." }`
- POST `http://localhost:4000/api/rank-candidates`
  Body: `{ "answers": ["...", "..."] }`

---
