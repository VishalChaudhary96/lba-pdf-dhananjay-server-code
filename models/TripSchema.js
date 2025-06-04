const mongoose = require("mongoose");

const { Schema } = mongoose;

// Subdocument Schema: Income Item
const incomeItemSchema = new Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    mode: { type: String, required: true },
  },
  { _id: true }
);

// Subdocument Schema: Expense Item
const expenseItemSchema = new Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    mode: { type: String, required: true },
  },
  { _id: true }
);

// Subdocument Schema: Primary Details
const primaryDetailsSchema = new Schema(
  {
    title: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
  },
  { _id: true }
);

// Subdocument Schema: Finance Details
const financeDetailsSchema = new Schema(
  {
    units: { type: Number, required: true },
    rate: { type: Number, required: true },
    subTotalAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    isGST: { type: Boolean, required: true },
    gstAmount: { type: Number, required: true },
    gstPercentage: { type: Number, required: true },
    advanceAmount: { type: Number, required: true },
    commissionAmount: { type: Number, required: true },
    tsdShortageAmount: { type: Number, required: true },
    courier: { type: String, required: true },
  },
  { timestamps: true, _id: true }
);

// Subdocument Schema: Driver Details
const driverDetailsSchema = new Schema(
  {
    salutation: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: true }
);

// Subdocument Schema: Income Details
const incomeDetailsSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    items: [incomeItemSchema],
  },
  { _id: true }
);

// Subdocument Schema: Expense Details
const expenseDetailsSchema = new Schema(
  {
    totalAmount: { type: Number, required: true },
    items: [expenseItemSchema],
  },
  { _id: false }
);

// Main Trip Schema
const tripSchema = new Schema(
  {
    primaryDetails: primaryDetailsSchema,
    financeDetails: financeDetailsSchema,
    driverDetails: driverDetailsSchema,
    incomeDetails: incomeDetailsSchema,
    expenseDetails: expenseDetailsSchema,
  },
  { timestamps: true }
);

const Trips = mongoose.model("Trip", tripSchema);
module.exports = Trips;
