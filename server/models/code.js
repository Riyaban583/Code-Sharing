import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  code: String,
  language: String,
  title: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Code", codeSchema);