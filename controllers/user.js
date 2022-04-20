import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client('22551978498-3d7pfatc0km7mpm8t6glfuu4ev2jld3a.apps.googleusercontent.com');

import * as passport_strategy from 'passport-oauth2';
// import passport from 'passport-oauth2';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const secret = 'test';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export const oauth = async (req, res) => {
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/user/google/failure'
  })
}

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log('email :', email);
  console.log('password :', password);

  try {
    const oldUser = await UserModal.findOne({ email });
    console.log('oldUser :', oldUser);

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log('err :', err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('hashedPassword :', hashedPassword);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const googleSignIn = async (req, res) => {

  const { token } = req.body;

  try {

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '22551978498-3d7pfatc0km7mpm8t6glfuu4ev2jld3a.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    console.log('payload :', payload);
  
    const {sub , email , name , picture} = payload;
    const id = sub;
    const loginChannel="Google";

    //下面程式碼要做的事： insertOnUpdate 使用google給的資料+nickname跟likes跟thumbups
    //mongoose應該有語法可以做到以下程式碼要做的事
    const userdata = await UserModal.findOne({ id: id });
      
    let nickname=userdata?.nickname?userdata.nickname:"NOT_SET";
    let likes=userdata?.likes?userdata.likes:[];

    //登入成功且取得資料成功，把資料寫入資料庫
    // insertOnUpdateUser();
    const update_result = await UserModal.updateOne( { id : id },{$set:  { password: '', name , email, picture , loginChannel, token ,nickname , likes}}, { upsert : true });

    //將clien會用到的data回傳（包含：nickname,userId(同googleId),likes跟thumbups）
    const dbdata = { id,nickname,likes};

    res.status(201).json(dbdata);

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    
  }
}

//更新使用者暱稱
export const updateNickName = async (req, res) => {
	
	const { userId,nickname }=req.body;

	try {
    const update_result = await UserModal.updateOne( { id : userId },{$set:  { nickname }}, { upsert : true });

		res.status(201).json({ nickname });

	} catch (err) {
    	res.status(500).json({ message: "Something went wrong" });
	}
}

//更新使用者暱稱
export const updateLike = async (req, res) => {
	
	const { userId, course, isLiked }=req.body;


  if(isLiked){
    
    //新增課程id到likes陣列
    try {
      
      const update_result = await UserModal.updateOne( { id : userId },{$push: { likes:course }});
  
      //這個query 應該只拿該拿的field 例如密碼就不該拿出來
      let userdata = await UserModal.findOne({ id: userId });

      res.status(201).json(userdata);
  
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
  }
  else{

    //從likes陣列刪除課程id
    try {
      
      const update_result = await UserModal.updateOne( { id : userId },{$pull: { likes:course }});

      const userdata = await UserModal.findOne({ id: userId });

      res.status(201).json(userdata);

    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export const getUserLikes = async (userId) =>{

  try{
    let user_likes=[]
    
    user_likes = await UserModal.findOne({id:userId},'likes');    
    
    return user_likes.likes;
  } catch (error) {
    
  }
  return user_likes;
}