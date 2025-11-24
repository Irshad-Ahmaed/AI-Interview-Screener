import express from "express";
import { evaluateController } from "../controllers/evaluate.controller.js";

const evaluateRoute = express.Router();

evaluateRoute.post("/", evaluateController);

export default evaluateRoute;
