const mongoose = require("mongoose");

//=================================//
//          Invoice Schema         //
//=================================//
const invoiceSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  dateIssued: {
    type: Date,
    default: Date.now(),
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
    },
  ],
});

module.exports = mongoose.model("Invoice", invoiceSchema);
