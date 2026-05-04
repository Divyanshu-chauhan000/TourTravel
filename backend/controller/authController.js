const otpGenerator =  require('otp-generator');
const User = require('../models/UserModels')
const sendEmail = require('../utils/sendOtp');
const otpStore = {};


//Sending Otp logic 
exports.sendOtp = async (req, res) =>{
  try{
    const {contact} = req.body;
    if(!contact){
      return res.status(400).json({message : "Contact required"});
    }
    
    if (!contact.includes("@")) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }
    const otp = otpGenerator.generate(6,{
      upperCaseAlphabets : false,
      specialChars : false,
      lowerCaseAlphabets : false,
      
    });

    otpStore[contact] = {
      otp,
      expiresAt: Date.now() + 5*60*1000 , // Otp will expire in % minutes
    };
    await sendEmail(contact, otp);
    console.log("Otp" , otp);

    res.json({message : "OTP sent successfully"});
  } 
  catch(error){
    console.log(error);
    res.status(500).json({message : "Error in sending OTP "});
  }
}


// verifing-otp login is here

exports.verifyOtp = async ( req, res) => {
  try{
    const {contact , otp } = req.body;
     const record = otpStore[contact];

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    delete otpStore[contact];

    // 🔥 User check / create
    let user = await User.findOne({ contact });

    if (!user) {
      user = await User.create({ contact });
    }

    res.json({
      message: "Login successful",
      user,
    });
  }catch(error){
    res.status(500).json({message : "Error in verifying otp"});
  }
}