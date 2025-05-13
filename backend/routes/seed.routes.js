import express from "express";
import { getSeedDatabase } from "../controllers/seed.controller.js";

const seedRouter = express.Router();

seedRouter.get("/", getSeedDatabase);


export default seedRouter;
