const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/paymentController");

// Routes
router.post("/create-order", PaymentController.createOrder);
router.post("/verify", PaymentController.verifyPayment);
router.get("/booking/:bookingId", PaymentController.getBooking);

module.exports = router;
