import { OTP } from "./otpModel.js";
import generateOTP from "../utility/generateOTP.js";
import sendEmail from "../utility/sendEmail.js"

import hashDatas from "../utility/hashData.js"
const {hashData}=hashDatas;
const { AUTH_EMAIL } = process.env;

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!(email && subject && message)) {
      throw Error("Provide value for email, subject, message");
    }

    // await OTP.deleteOne({ email });

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

    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });

    res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export default otpController;
