import { useState, useCallback } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { paymentService } from '../services/api';

export const useBooking = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    bookingData,
    setBookingData,
    setLoading,
    setError,
    setOrderId,
    setPaymentDetails,
  } = useBookingStore();

  const createOrder = useCallback(async (tourId, email, phone, fullName) => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await paymentService.createOrder(tourId, email, phone, fullName);
      if (response.data.success) {
        setOrderId(response.data.order.id);
        setPaymentDetails(response.data);
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to create order';
      setError(errorMessage);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [setError, setOrderId, setPaymentDetails]);

  const verifyPayment = useCallback(async (paymentData) => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await paymentService.verifyPayment(paymentData);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Payment verification failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [setError]);

  return {
    bookingData,
    setBookingData,
    createOrder,
    verifyPayment,
    isProcessing,
  };
};
