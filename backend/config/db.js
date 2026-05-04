const express =  require('express');
const mongoose  =  require('mongoose');

const dns = require('dns');
dns.setServers([
  '0.0.0.0',
  '1.1.1.1'
])

const connectDB = async () =>{
  try{
   await  mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected sucessfully")
  }
  catch(error){
    console.log("Failed to connect with  mongoDB ", error);
  }
}


module.exports =  connectDB