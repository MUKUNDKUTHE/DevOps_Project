import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, default: "Partnership" },
  message: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Proposal", proposalSchema);
