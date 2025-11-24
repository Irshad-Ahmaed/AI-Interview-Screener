import express from "express";
import { rankController } from "../controllers/rank.controller.js";

const rankRouter = express.Router();

rankRouter.post("/", rankController);

export default rankRouter;
