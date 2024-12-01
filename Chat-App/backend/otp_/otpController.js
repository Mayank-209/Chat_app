import { OTP } from "./otpModel.js";
import generateOTP from "../utility/generateOTP.js";
import sendEmail from "../utility/sendEmail.js"

import hashDatas from "../utility/hashData.js"
const {hashData,verifyHashedData}=hashDatas;
const { AUTH_EMAIL } = process.env;

const verifyOTP=async ({email,otp})=>{
  try {
    if(!(email && otp)){
      throw Error
    }

    const matchedOTPRecord=await OTP.findOne({email})

    if(!matchedOTPRecord){
      throw Error("No otp records found")
    }

    const {expiresAt}=matchedOTPRecord;

    if(expiresAt<Date.now()){
      await OTP.deleteOne({email});
      throw Error("Code hai expired. Request for a new one.")
    }

    const hashedOTP=matchedOTPRecord.otp
    const validOTP=await verifyHashedData(otp,hashedOTP);
    return validOTP
  } catch (error) {
    throw error
  }
}

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Provide value for email, subject, message");
    }
    const res= await OTP.findOne({email})
    if(res){
     await OTP.deleteOne({ email });
    }
    

    const generatedOTP =await generateOTP();
    console.log(generatedOTP);
    

    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p><p><b>${generatedOTP}</b></p><p.This code <b>expires in ${duration} hour(s)<b/>.</p>`,
    };
    await sendEmail(mailOptions);

    const hashedOTP = await hashData(generatedOTP);
    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;

    //save otp record
  } catch (error) {
    throw error;
  }
};

const otpController=async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;

    console.log(email);

    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });

    res.status(200).json({
      success:true
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const verify= async(req,resp)=>{
  try {
    let {email,otp}=req.body

    console.log(email,otp);

    const validOTP=await verifyOTP({email,otp})

    resp.status(200).json({vali:validOTP})
    console.log(resp.data)
    

  } catch (error) {
    resp.status(400).send(error.message)
  }
}

const deleteOTP=async (email)=>{
  try {
    await OTP.deleteOne({email})
  } catch (error) {
    throw error
  }
}

export default {otpController,verify,deleteOTP};
