import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import evaluateRoute from "./routes/evaluate.route.js";
import rankRoute from "./routes/rank.route.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// simple rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60
});
app.use(limiter);

// routes
app.use("/api/evaluate-answer", evaluateRoute);
app.use("/api/rank-candidates", rankRoute);

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// error handler
app.use(errorHandler);

export default app;
