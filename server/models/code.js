import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  code: mongoose.Schema.Types.Mixed, // Can be string or object
  language: String,
  title: String,
  author: { type: String, default: "Anonymous" },
  likes: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

codeSchema.index({ createdAt: -1 });

export default mongoose.model("Code", codeSchema);