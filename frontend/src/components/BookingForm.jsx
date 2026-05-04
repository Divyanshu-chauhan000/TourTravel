import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../hooks/useBooking';
import { useToast } from '../hooks/useToast';
import { useBookingStore } from '../store/bookingStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Spinner } from './ui/Spinner';
import { Toast } from './ui/Toast';

const tours = [
  { id: 1, name: "Paris Tour", price: 27000, image: "🗼" },
  { id: 2, name: "London Tour", price: 15000, image: "🇬🇧" },
  { id: 3, name: "Tokyo Tour", price: 32000, image: "🗽" },
];

export const BookingForm = ({ onSuccess }) => {
  const { currentStep, setCurrentStep, bookingData, setBookingData, error, successMessage } = useBookingStore();
  const { createOrder, verifyPayment, isProcessing } = useBooking();
  const { toasts, success, error: showError, removeToast } = useToast();
  
  const [formErrors, setFormErrors] = useState({});
  const [selectedTour, setSelectedTour] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Step 1: Tour Selection
  const handleTourSelect = (tour) => {
    setSelectedTour(tour);
    setBookingData({
      tourId: tour.id,
      tourName: tour.name,
      totalAmount: tour.price,
      advanceAmount: Math.floor(tour.price * 0.1),
      remainingAmount: tour.price - Math.floor(tour.price * 0.1),
    });
    setFormErrors({});
  };

  // Step 2: Personal Details
  const validateStep2 = () => {
    const errors = {};
    if (!bookingData.fullName.trim()) errors.fullName = 'Name is required';
    if (!bookingData.email.trim()) errors.email = 'Email is required';
    if (!bookingData.email.includes('@')) errors.email = 'Invalid email';
    if (!bookingData.phone.trim()) errors.phone = 'Phone is required';
    if (bookingData.phone.length < 10) errors.phone = 'Phone must be at least 10 digits';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  // Step 3: Payment
  const handlePayment = async () => {
  try {
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      showError("Razorpay SDK failed to load");
      return;
    }

    console.log("Razorpay Check:", window.Razorpay); // DEBUG

    const orderResponse = await createOrder(
      bookingData.tourId,
      bookingData.email,
      bookingData.phone,
      bookingData.fullName
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderResponse.order.amount, // 🔥 backend se hi le
      currency: "INR",
      name: "Tour Booking",
      description: `${orderResponse.tourDetails.name} - Advance Payment`,
      order_id: orderResponse.order.id,

      handler: async (response) => {
        try {
          const verifyResponse = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email: bookingData.email,
            phone: bookingData.phone,
            fullName: bookingData.fullName,
            tourId: bookingData.tourId,
          });

          if (verifyResponse.success) {
            success("Payment verified successfully!");
            setCurrentStep(4);
            if (onSuccess) onSuccess(verifyResponse.booking);
          }
        } catch (err) {
          showError("Payment verification failed");
        }
      },

      prefill: {
        email: bookingData.email,
        contact: bookingData.phone,
        name: bookingData.fullName,
      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options); // ✅ correct
    rzp.open();

  } catch (error) {
    showError(error.message || "Payment failed");
  }
};

  const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay loaded");
      resolve(true);
    };
    script.onerror = () => {
      console.log("Razorpay failed to load");
      resolve(false);
    };

    document.body.appendChild(script);
  });
};
console.log(window.Razorpay)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <Toast toasts={toasts} onRemove={removeToast} />
      
      <div className="max-w-2xl mx-auto">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  font-semibold text-sm
                  ${currentStep >= step ? 'bg-primary text-white' : 'bg-gray-700 text-gray-400'}
                  transition-all
                `}
              >
                {step}
              </motion.div>
              {step < 4 && (
                <div
                  className={`
                    h-1 w-16 mx-2
                    ${currentStep > step ? 'bg-primary' : 'bg-gray-700'}
                    transition-all
                  `}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Step 1: Tour Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Select Your Tour</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tours.map((tour) => (
                <Card
                  key={tour.id}
                  onClick={() => handleTourSelect(tour)}
                  className={`cursor-pointer ${
                    selectedTour?.id === tour.id ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <div className="text-4xl mb-3">{tour.image}</div>
                  <h3 className="text-lg font-semibold text-white">{tour.name}</h3>
                  <p className="text-primary mt-2 text-lg font-bold">₹{tour.price}</p>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!selectedTour}
              size="lg"
              className="w-full"
            >
              Next: Personal Details
            </Button>
          </motion.div>
        )}

        {/* Step 2: Personal Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">Your Details</h2>
            <Card>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={bookingData.fullName}
                  onChange={(e) => setBookingData({ fullName: e.target.value })}
                  error={formErrors.fullName}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ email: e.target.value })}
                  error={formErrors.email}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ phone: e.target.value })}
                  error={formErrors.phone}
                />
              </div>
            </Card>

            {/* Tour Summary */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Booking Summary</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Tour:</span>
                  <span className="font-semibold text-white">{bookingData.tourName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold text-white">₹{bookingData.totalAmount}</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between text-primary font-bold">
                    <span>Advance Payment (10%):</span>
                    <span>₹{bookingData.advanceAmount}</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                size="lg"
                className="flex-1"
              >
                Next: Payment
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">Payment</h2>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Complete Your Booking</h3>
              <div className="space-y-4 text-gray-300 mb-6">
                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <span>Tour:</span>
                  <span className="text-white">{bookingData.tourName}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <span>Name:</span>
                  <span className="text-white">{bookingData.fullName}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-700">
                  <span>Email:</span>
                  <span className="text-white text-sm">{bookingData.email}</span>
                </div>
                <div className="flex justify-between font-bold text-primary">
                  <span>Amount to Pay:</span>
                  <span className="text-2xl">₹{bookingData.advanceAmount}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Click proceed to complete the advance payment (10% of total tour cost). Remaining amount will be due at the time of tour.
              </p>
            </Card>

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep(2)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handlePayment}
                loading={isProcessing}
                size="lg"
                className="flex-1"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl"
            >
              ✓
            </motion.div>
            <h2 className="text-4xl font-bold text-primary">Booking Confirmed!</h2>
            <Card>
              <p className="text-gray-300 mb-4">
                Thank you for booking with us. A confirmation email has been sent to {bookingData.email}
              </p>
              <p className="text-gray-400 text-sm">
                You will receive further details about your tour shortly.
              </p>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Load Razorpay Script */}
     
    </div>
  );
};
