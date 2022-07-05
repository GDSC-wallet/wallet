import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

//TODO: JWT過期 => 重新發一個？

//驗證jwt是否有效或是過期
const auth = async (req, res, next) => {

  try {
    res.user = req.session?.passport?.user
    next();
  } catch (error) {
    console.log('error :', error);
    res.status(401).json({ success: false, message: "session parse error" })
  }
};

export default auth;
