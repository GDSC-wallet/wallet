import mongoose from "mongoose";

//使用者table
const userSchema = mongoose.Schema({
  id: { type: String ,unique:true}, //primary key
  token: { type: String ,unique:true}, //google api 回傳的此使用者的代碼（驗證用） 
  name: { type: String, required:  true }, // (取自google api)
  email: { type: String, required: true }, // (取自google api)
  password: { type: String, required: true }, //如果是使用google api登入的,則此欄位為空
  picture: { type: String }, // 人物頭像圖(取自google api)
  nickname: { type: String },// 暱稱
  loginChannel: { type: String }, //使用者的登入管道
  isValid: { type: String }, //是否通過信箱驗證
  isBanned: { type: String }, //是否被ban
  likes:[String], //使用者收藏的課程id陣列
  thumbups:[String], //使用者按讚的評價（feedback）id陣列
},{timestamps: true});

export default mongoose.model("User", userSchema);