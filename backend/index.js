import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Database
import { mongoClient } from "./libs/db.js";

// Routes
import courseRouter from "./routes/course.routes.js";
import seedRouter from "./routes/seed.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to ChaiCode API ☕️",
  });
});

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/seed", seedRouter);

app.listen(PORT, async () => {
  await mongoClient.connect();
  console.log(`Backend server running at http://localhost:${PORT}`);
});
