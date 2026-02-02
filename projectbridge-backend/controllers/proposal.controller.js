import Proposal from "../models/Proposal.js";
import Project from "../models/Project.js";

/**
 * Company sends a proposal
 */
export const sendProposal = async (req, res) => {
  try {
    const { projectId, message } = req.body;

    if (!projectId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const proposal = await Proposal.create({
      projectId,
      companyId: req.user?.id || null,
      message,
      status: "Pending",
    });

    res.status(201).json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send proposal" });
  }
};

/**
 * College views proposals for its projects
 */
export const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate("projectId", "title description domain")
      .populate("companyId", "email");

    res.json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch proposals" });
  }
};

/**
 * College approves or rejects a proposal
 */
export const updateProposalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const proposal = await Proposal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("projectId", "title")
      .populate("companyId", "email");

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update proposal" });
  }
};
