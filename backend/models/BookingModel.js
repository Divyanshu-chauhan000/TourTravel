const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    tourId: {
      type: Number,
      required: true,
    },
    tourName: String,
    totalAmount: Number,
    advanceAmount: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    advancePaid: {
      type: Boolean,
      default: false,
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
