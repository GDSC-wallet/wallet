import jwt from "jsonwebtoken";

const secret = 'GDSC_WALLET';

//TODO: JWT過期 => 重新發一個？

//驗證jwt是否有效或是過期
const auth = async (req, res, next) => {
  try {
    const prefix = req.headers.authorization.split(" ")[0];
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth && prefix == "Bearer") {      
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.user_id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    req.decodedData = decodedData;
    
    next();
  } catch (error) {
    console.log('error :', error);
    res.status(401).json({status:"token expired",msg:error})
  }
};

export default auth;
