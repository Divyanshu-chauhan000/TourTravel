const PaymentService = require('../services/paymentService');

class PaymentController {
  // Create order
  static async createOrder(req, res, next) {
    try {
      const { tourId, email, phone, fullName } = req.body;

      // Validation
      if (!tourId || !email || !phone || !fullName) {
        return res.status(400).json({
          error: 'Missing required fields: tourId, email, phone, fullName'
        });
      }

      const result = await PaymentService.createOrder(tourId, email, phone, fullName);

      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      console.error('[PAYMENT ERROR FULL]', error);
console.error('[PAYMENT ERROR MESSAGE]', error?.message);
console.error('[PAYMENT ERROR STACK]', error?.stack);
      res.status(500).json({
        error: error.message
      });
    }
  }

  // Verify payment
  static async verifyPayment(req, res, next) {
    try {
      const result = await PaymentService.verifyPayment(req.body);
      res.json(result);
    } catch (error) {
      console.error('[VERIFY ERROR]', error.message);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get booking
  static async getBooking(req, res, next) {
    try {
      const { bookingId } = req.params;
      const booking = await PaymentService.getBooking(bookingId);
      res.json({
        success: true,
        booking
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = PaymentController;
