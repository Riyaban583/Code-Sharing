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

codeSchema.index({ createdAt: -1 });

export default mongoose.model("Code", codeSchema);