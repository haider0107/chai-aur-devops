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
    message: "Welcome to ChaiCode API ☕️    ",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ alive: true });
});

app.get("/version", (_req, res) => {
  res.status(200).json({
    version: "v1",
    host: process.env.NODE_HOST,
  });
});

app.get("/url", (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log("Current URL:", fullUrl);

  res.status(200).json({
    fullUrl,
    host: process.env.NODE_HOST,
  });
  // res.send("Check your server logs");
});

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/seed", seedRouter);

app.listen(PORT, async () => {
  await mongoClient.connect();
  console.log(`Backend server running at http://localhost:${PORT}`);
});
