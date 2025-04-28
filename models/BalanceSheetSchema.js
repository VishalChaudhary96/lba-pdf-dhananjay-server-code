const mongoose = require("mongoose");

// Define the item sub-document schema
const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  accountName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["DEBIT", "CREDIT"], required: true },
  date: { type: String, required: true }, // Stored as a string
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

// Define the main document schema
const mainSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    totalCreditedAmount: { type: Number, required: true, default: 0 },
    totalDebitedAmount: { type: Number, required: true, default: 0 },
    items: [itemSchema], // Array of item sub-documents
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    balanceAmount: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const BalanceSheets = mongoose.model("BalanceSheets", mainSchema);

module.exports = BalanceSheets;
