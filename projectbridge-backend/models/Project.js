import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  domain: { type: String, required: [true, "Domain is required"] },
  skills: { type: String, required: [true, "Skills are required"] },
  description: { type: String, required: [true, "Description is required"] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
