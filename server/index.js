import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


/* ---------- Middlewares ---------- */
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/* ---------- API Routes (FIRST) ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);





/* ---------- MongoDB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
