import express from "express";
import { saveCode, getCode, getAllCodes } from "../controllers/codeController.js";

const router = express.Router();

// ✅ Specific routes FIRST
router.post("/save", saveCode);
router.get("/", getAllCodes);

// ❗ Dynamic route LAST
router.get("/:id", getCode);

export default router;