import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import codeRoutes from "./routes/codeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Config
dotenv.config();

const app = express();

// ====================================
// MIDDLEWARE
// ====================================
app.use(cors());

app.use(express.json());

// ====================================
// ROUTES
// ====================================
app.use("/api/code", codeRoutes);

app.use("/api/auth", authRoutes);

// ====================================
// TEST ROUTE
// ====================================
app.get("/", (req, res) => {

  res.send(
    "Backend Working Successfully"
  );

});

// ====================================
// MONGODB CONNECTION
// ====================================
mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((err) => {

  console.log(err);

});

// ====================================
// PORT
// ====================================
const PORT =
  process.env.PORT || 5000;

// ====================================
// START SERVER
// ====================================
app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});