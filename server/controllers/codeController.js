import Code from "../models/Code.js";

// Save code
export const saveCode = async (req, res) => {
  try {
    const newCode = await Code.create(req.body);
    res.json(newCode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get code by ID
export const getCode = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    res.json(code);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all codes
export const getAllCodes = async (req, res) => {
  try {
    const codes = await Code.find().sort({ createdAt: -1 });
    res.json(codes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};