import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import codeRoutes from "./routes/codeRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/code", codeRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Local server only
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}

// Export app for Vercel
export default app;