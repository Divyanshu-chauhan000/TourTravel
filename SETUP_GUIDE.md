# Tour Booking System - Setup Guide

This guide will help you get the production-ready tour booking system up and running.

## Overview

The system has been restructured with:
- **Backend**: Node.js/Express with service-controller architecture, secure payment handling
- **Frontend**: React with Tailwind CSS, Framer Motion animations, and Zustand state management
- **Payment**: Razorpay integration with secure signature verification
- **Database**: MongoDB with booking records

## Backend Setup

### 1. Environment Variables

Create/update `.env` file in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tour-booking
JWT_SECRET=your_jwt_secret_key_change_this_in_production
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 2. Get Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Copy your Key ID and Key Secret
5. Add them to your `.env` file

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Start the Server

```bash
npm start
# Server runs on http://localhost:5000
```

### Project Structure

```
backend/
├── config/          # Database configuration
├── controller/      # Request handlers
│   └── paymentController.js
├── models/          # Database schemas
│   ├── UserModels.js
│   └── BookingModel.js
├── routes/          # API routes
│   ├── authRoutes.js
│   └── payment.js
├── services/        # Business logic
│   └── paymentService.js
├── utils/           # Utilities
│   └── sendOtp.js
├── server.js
└── .env
```

## Frontend Setup

### 1. Environment Variables

Create/update `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Start Development Server

```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### Project Structure

```
frontend/src/
├── components/
│   ├── BookingForm.jsx        # Main booking form with steps
│   ├── ErrorBoundary.jsx      # Error handling wrapper
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ui/                    # Reusable UI components
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Card.jsx
│       ├── Toast.jsx
│       ├── Spinner.jsx
│       ├── StepIndicator.jsx
│       └── LoadingOverlay.jsx
├── hooks/                      # Custom React hooks
│   ├── useBooking.js          # Booking logic
│   └── useToast.js            # Toast notifications
├── pages/                      # Page components
├── services/
│   └── api.js                 # API client with axios
├── store/
│   └── bookingStore.js        # Zustand state management
├── App.jsx
├── main.jsx
└── index.css
```

## Key Features Implemented

### 1. Booking Form (Multi-step)
- **Step 1**: Tour Selection
- **Step 2**: Personal Details (Name, Email, Phone)
- **Step 3**: Payment (10% advance)
- **Step 4**: Success Confirmation

### 2. State Management
- Zustand store for booking data
- Persistent state across steps
- Easy reset functionality

### 3. UI Components
- Button with loading states
- Input with validation
- Card with hover effects
- Toast notifications
- Step indicators
- Error boundaries

### 4. Payment Flow
1. Create Razorpay order with backend
2. Open Razorpay checkout modal
3. User completes payment
4. Verify signature with backend
5. Save booking to database
6. Show success screen

### 5. Backend Architecture
- **Controllers**: Handle HTTP requests
- **Services**: Contain business logic
- **Models**: Define database schemas
- **Routes**: Define API endpoints

## API Endpoints

### Auth Routes
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and login

### Payment Routes
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment and create booking
- `GET /api/payment/booking/:bookingId` - Get booking details

## Testing

### Backend Testing
```bash
# Test health check
curl http://localhost:5000/api/health

# Test create order
curl -X POST http://localhost:5000/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "tourId": 1,
    "email": "test@example.com",
    "phone": "9876543210",
    "fullName": "John Doe"
  }'
```

### Frontend Testing
- Navigate to `http://localhost:5173`
- Select a tour
- Fill in personal details
- Complete payment with Razorpay test credentials
- Verify booking confirmation

## Razorpay Test Credentials

For testing payments:
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: 12/25
- **CVV**: 123

## Troubleshooting

### "Cannot find module" errors
Make sure all dependencies are installed:
```bash
npm install
```

### "RAZORPAY_KEY_ID is not set"
Check that `.env` file exists and has the correct keys set.

### Payment not working
1. Verify Razorpay keys are correct
2. Check that backend is running on port 5000
3. Check browser console for errors
4. Verify CORS is enabled in backend

### Database connection errors
1. Ensure MongoDB is running
2. Check MONGODB_URI in `.env`
3. Verify network connectivity

## Production Deployment

### Environment Variables
Update all `.env` files with production values:
- Use strong JWT_SECRET
- Use live Razorpay keys
- Update FRONTEND_URL
- Use production MongoDB URI

### Security Checklist
- [ ] Use HTTPS
- [ ] Update CORS origins
- [ ] Enable rate limiting
- [ ] Use secure cookies
- [ ] Validate all inputs
- [ ] Implement request logging

### Deployment Commands

**Backend (e.g., on Heroku)**
```bash
git push heroku main
```

**Frontend (e.g., on Vercel)**
```bash
npm run build
vercel deploy
```

## Support & Documentation

- Razorpay Docs: https://razorpay.com/docs/
- Zustand: https://github.com/pmndrs/zustand
- Framer Motion: https://www.framer.com/motion/
- Tailwind CSS: https://tailwindcss.com/

## License

This project is proprietary and confidential.
