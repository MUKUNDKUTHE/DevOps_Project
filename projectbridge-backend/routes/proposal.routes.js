import express from "express";
import { sendProposal, getProposals, updateProposalStatus } from "../controllers/proposal.controller.js";

const router = express.Router();

router.post("/", sendProposal);
router.get("/", getProposals);
router.patch("/:id", updateProposalStatus);

export default router;
