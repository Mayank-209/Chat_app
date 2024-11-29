import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import otpRoutes from "./otp_/otpRoutes.js"


dotenv.config({});

const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

//routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/otp",otpRoutes)

app.listen(PORT, () => {
  connectdb();
  console.log(`server listen at port ${PORT}`);
});
