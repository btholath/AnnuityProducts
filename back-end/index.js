// ---------- Step 1: Backend Server using Express & Mongoose ----------
// File: server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017", {
  auth: {
    username: "annuity_admin",
    password: "StrongPassword123!",
  },
  authSource: "admin",
  dbName: "life_insurance",
});

// Mongoose Schema
const annuitySchema = new mongoose.Schema({
  policy_number: String,
  type: String,
  customer: {
    name: String,
    age: Number,
  },
  premium: Number,
  interest_rate: Number,
  start_date: String,
  status: String,
  sub_accounts: [String],
  index: String,
  cap_rate: Number,
  floor_rate: Number,
  payout_frequency: String,
  payout_amount: Number,
  defer_until: String,
});

//const Policy = mongoose.model("Policy", annuitySchema);
const Policy = mongoose.model("Policy", annuitySchema, "annuity_policies");

// API Routes
app.post("/policies", async (req, res) => {
  const newPolicy = new Policy(req.body);
  const result = await newPolicy.save();
  res.json(result);
});

app.get("/policies", async (req, res) => {
  const policies = await Policy.find();
  res.json(policies);
});

app.put("/policies/:id", async (req, res) => {
  const updated = await Policy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

app.delete("/policies/:id", async (req, res) => {
  await Policy.findByIdAndDelete(req.params.id);
  res.json({ status: "Deleted" });
});

app.get("/policies/active", async (req, res) => {
  const activePolicies = await Policy.find({ status: "Active" });
  res.json(activePolicies);
});

app.listen(4000, () =>
  console.log("🚀 Backend running at http://localhost:4000")
);
