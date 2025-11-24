# AI Interview Screener (Node.js + Express + Prisma + Neon)

A minimal backend that evaluates candidate answers using an LLM and ranks candidates. Includes Prisma schema and Neon Postgres instructions.

## Features

- POST /api/evaluate-answer → Evaluate single answer (returns { score, summary, improvement })
- POST /api/rank-candidates → Evaluate multiple in parallel, return ranked results
- Optional saving of answers + evaluations to Postgres (Prisma)

---

## Prerequisite

- Node.js 18+
- npm
- Neon Postgres account (free tier)
- Prisma CLI (installed as dev dependency)

---

## Quick start (local)

1. Clone repo
2. `cp .env.example .env` and fill values:
   - `DATABASE_URL` (get from Neon dashboard; example: `postgresql://user:pass@<host>:5432/<db>?sslmode=require`)
   - `GROQ_API_KEY` and `GROQ_API_URL` (or your chosen LLM provider)
3. Install:
   ```
   npm install
   ```
4. Initialize Prisma (already included in repo) and run migrations:

```
npx prisma generate
npx prisma migrate dev --name init
```

5. Start dev server:

```
npm run dev
```

6. API endpoints:

- POST `http://localhost:4000/api/evaluate-answer`
  Body: `{ "answer": "Candidate says: ..." }`
- POST `http://localhost:4000/api/rank-candidates`
  Body: `{ "answers": ["...", "..."] }`

---

## Prisma + Neon (detailed)

1. Create a Neon project and database. Copy the connection string from the Neon dashboard.
2. Set your `.env` `DATABASE_URL` to Neon connection string. Neon examples & Prisma guide: https://neon.com/docs/guides/prisma and https://neon.com/docs/guides/prisma-migrations. :contentReference[oaicite:2]{index=2}
3. Generate Prisma client:
   `npx prisma generate`
4. Create and run migrations (development):
   `npx prisma migrate dev --name init`
