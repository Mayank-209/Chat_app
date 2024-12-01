
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
function stringToSixDigitCode(input) {
  // Create a hash value from the input string
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
      hash = (hash * 31 + input.charCodeAt(i)) % 1000000; // Keep the hash within a 6-digit range
  }
  // Ensure the result is a 6-digit number (pad with zeros if necessary)
  //469628
  return String(hash).padStart(6, '0');
}
export const register = async (req, resp) => {
  try {
    const { fullName, userEmail, password, confirmPassword, gender } = req.body;
    if (!fullName || !userEmail || !password || !confirmPassword || !gender) {
      return resp.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return resp.status(400).json({ message: "Password dosen't match" });
    }

    const user = await User.findOne({ userEmail });
    if (user) {
      return resp.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const malePP = `https://avatar.iran.liara.run/public/boy?username=${userEmail}`;
    const femalePP = `https://avatar.iran.liara.run/public/girl?username=${userEmail}`;
    let profPic=""
    console.log(typeof(profPic));
    
    if(gender==="male"){
      profPic=malePP;
    }
    else{
      profPic=femalePP;
    }
    console.log(profPic);

    
    await User.create({
      fullName,
      userEmail,
      password: hashedPassword,
      profilepic: profPic,
      gender,
    });
    return resp.status(201).json({
      message: "Account Created Succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, resp) => {
  try {
    const { userEmail, password } = req.body;
    if (!userEmail || !password) {
      return resp.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ userEmail });
    if (!user) {
      return resp.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return resp.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    

    return resp
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        userEmail: user.userEmail,
        fullName: user.fullName,
        profilePic: user.profilepic,
        message:"Logged in Successfully",
        success:true,
      });
  } catch (error) {
    console.log(error);
  }
};



// Example usage:
// const randomString = "mayank123456789";
// const sixDigitCode = stringToSixDigitCode(randomString);
// console.log(`The 6-digit code for ${randomString} is: ${sixDigitCode}`);




export const logout = (req, resp) => {
  try {
    return resp.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "user logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, resp) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return resp.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
