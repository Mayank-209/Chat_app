import mongoose from "mongoose";
const Schema=mongoose.Schema;

const OTPSchema=new Schema({
  email:{
    type:String,unique:true
  },
  otp:String,
  createdAt:Date,
  expiresAt:Date,
})


export const OTP=mongoose.model("OTP",OTPSchema);