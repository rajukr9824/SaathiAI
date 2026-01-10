import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: String,
  role: { type: String, enum: ["user", "assistant"] },
  content: String,
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
