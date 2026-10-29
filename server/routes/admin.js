const express = require("express");
const User = require("../models/User");
const QuoteRequest = require("../models/QuoteRequest");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth, requireAdmin);

// GET /api/admin/buyers?status=pending — review queue for new business signups
router.get("/buyers", async (req, res) => {
  const filter = {};
  if (req.query.status) filter.approvalStatus = req.query.status;
  const buyers = await User.find(filter).sort({ createdAt: -1 });
  res.json({ buyers });
});

// PUT /api/admin/buyers/:id/approve
router.put("/buyers/:id/approve", async (req, res) => {
  const { pricingTier = "standard" } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { approvalStatus: "approved", pricingTier, rejectionReason: undefined },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "Buyer not found" });
  res.json({ message: `${user.businessName} approved`, user });
});

// PUT /api/admin/buyers/:id/reject
router.put("/buyers/:id/reject", async (req, res) => {
  const { reason } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { approvalStatus: "rejected", rejectionReason: reason },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "Buyer not found" });
  res.json({ message: `${user.businessName} rejected`, user });
});

// DELETE /api/admin/buyers/:id — permanently remove a buyer account
// (works for pending, approved, or rejected accounts)
router.delete("/buyers/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Buyer not found" });
  if (user.role === "admin") {
    return res.status(400).json({ message: "Admin accounts cannot be deleted from here." });
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: `${user.businessName} deleted` });
});

// GET /api/admin/quotes — all quote requests, newest first
router.get("/quotes", async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const quotes = await QuoteRequest.find(filter).populate("buyer", "businessName email fullName").sort({ createdAt: -1 });
  res.json({ quotes });
});

// PUT /api/admin/quotes/:id — update status / respond
router.put("/quotes/:id", async (req, res) => {
  const { status, adminResponse, estimatedTotal } = req.body;
  const quote = await QuoteRequest.findByIdAndUpdate(
    req.params.id,
    { status, adminResponse, estimatedTotal },
    { new: true }
  );
  if (!quote) return res.status(404).json({ message: "Quote not found" });
  res.json({ quote });
});

module.exports = router;
