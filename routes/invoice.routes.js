const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoice.controller');
const { schema,adminSchema, schemaPasswd ,invoiceSchema} = require("../middleware/joi_verification");

//=============================//
//     Joi schema Validate     //
//=============================//
const validate = (schema) => async (req, res, next) => {
  try {
    console.log("body =>", req.body);
    //validate Schema
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// Create a new invoice
router.post('/invoices',validate(invoiceSchema),invoiceController.createInvoice);

// Get a list of all invoices
router.get('/invoices', invoiceController.getAllInvoices);

// Get an invoice by ID
router.get('/invoices/:id', invoiceController.getInvoiceById);

// Update an invoice by ID
router.put('/invoices/:id',validate(invoiceSchema), invoiceController.updateInvoiceById);

// Delete an invoice by ID
router.delete('/invoices/:id', invoiceController.deleteInvoiceById);

module.exports = router;
