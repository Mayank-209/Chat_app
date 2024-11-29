import jwt from "jsonwebtoken";
const isAuthenticated = async(req, resp, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return resp.status(401).json({ message: "User not not Authenticated" });
    }
    const decode= jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decode){
      return resp.status(401).json({message:"Invalid token"})
    }
    req.id= decode.userId;

    next();
  } catch {
    console.log(error);
  }
};

export default isAuthenticated;
