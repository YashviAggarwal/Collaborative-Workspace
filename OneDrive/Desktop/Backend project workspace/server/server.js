import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  process.env.CLIENT_URL, // set this for production
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like Postman/curl (no origin) and whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found." }));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message || "Something went wrong on the server." });
});

try {
  await connectDB();
  const port = process.env.PORT || 5000;
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exit(1);
}