import express from "express";
import otpController from "./otpController.js"

const router = express.Router();


router.post("/otps",otpController );

export default router;
