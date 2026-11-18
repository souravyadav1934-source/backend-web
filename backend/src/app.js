import express from "express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import { API_PREFIX } from "./config/constants.js";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Backend API is running." });
});
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/posts`, postRoutes);

app.use((_req, res) => res.status(404).json({ message: "Route not found." }));
app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.code === 11000) return res.status(409).json({ message: "That email address is already registered." });
  return res.status(500).json({ message: "Internal server error." });
});

export default app;
