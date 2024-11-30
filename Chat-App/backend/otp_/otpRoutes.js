import express from "express";
import otpControllers from "./otpController.js"
const {otpController,verify,deleteOTP}=otpControllers

const router = express.Router();


router.post("/otps",otpController );
router.post("/verify",verify);

export default router;
