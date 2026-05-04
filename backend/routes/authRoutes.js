const express =  require('express');
const authRouter = express.Router();


const {
  sendOtp ,
  verifyOtp
 } = require('../controller/authController');

 authRouter.post('/send-otp' , sendOtp);
 authRouter.post('/verify-otp' , verifyOtp);


 module.exports = authRouter;
