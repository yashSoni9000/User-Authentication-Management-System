const Invoice = require("../models/Invoice"); // Import the Invoice model
const User = require("../models/User"); // Import the User model

//===================================//
//       Create a new invoice        //
//===================================//
exports.createInvoice = async (req, res) => {
  try {
    const { customer_id, invoiceNumber, totalAmount, items } = req.body;
    const invoice = new Invoice({
      customer_id,
      invoiceNumber,
      totalAmount,
      items,
    });
    const savedInvoice = await invoice.save();

    // Find the user by ID
    const user = await User.findById(customer_id);

    // Add the invoice to the user's invoices array
    user.invoices.push(savedInvoice._id);
    await user.save();
    res.status(200).send({ msg: "Invoice Created!!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//================================//
//  Get a list of all invoices    //
//================================//
exports.getAllInvoices = async (req, res) => {
  try {
    // Find all invoices
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ error: "Not Found" });
  }
};

//================================//
//  Get a single invoice by ID    //
//================================//
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if invoice exists
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//================================//
//     Update a invoice by ID     //
//================================//
exports.updateInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if invoice exists and update it
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ error: "Not Found" });
  }
};

//================================//
//     Delete a invoice by ID     //
//================================//
exports.deleteInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if invoice exists and delete it
    const deletedInvoice = await Invoice.findByIdAndRemove(id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(deletedInvoice);
  } catch (error) {
    res.status(400).json({ error: "Not Found" });
  }
};
