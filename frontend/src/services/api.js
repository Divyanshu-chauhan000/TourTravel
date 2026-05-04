import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authService = {
  sendOtp: (email) => apiClient.post('/auth/send-otp', { contact: email }),
  verifyOtp: (email, otp) => apiClient.post('/auth/verify-otp', { contact: email, otp }),
};

// Payment APIs
export const paymentService = {
  createOrder: (tourId, email, phone, fullName) =>
    apiClient.post('/payment/create-order', { tourId, email, phone, fullName }),

  verifyPayment: (paymentData) =>
    apiClient.post('/payment/verify', paymentData),
};

// Health check
export const healthCheck = () => apiClient.get('/health');

export default apiClient;
