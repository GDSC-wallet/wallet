import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

//TODO: JWT過期 => 重新發一個？

//驗證jwt是否有效或是過期
const auth = async (req, res, next) => {

  try {
    console.log(req);
    res.user = req.session.passport.user
    const expTime = req.session.cookie._expires
    if(expTime < new Date().toISOString()) throw new Error();
    next();
  } catch (error) {
    console.log('error :', error);
    req.session.destroy();
    res.status(401).json({ success: false, message: "session parse error" })
  }
};

export default auth;
