import mongoose from 'mongoose';
const { Schema } = mongoose;

//想要override _id 失敗 只好把原本的id值存到course欄位
const courseSchema = mongoose.Schema({
    course: { type: String ,unique:true }, //primary key()
    semester: { type: String }, //學期(共四碼：)e.g. "1101"代表110學年上學期 前三碼代表學年 第四碼代表上或下學期
    code: { type: String },  //由政大編碼的九碼課程id (取自課程查詢下載的excel檔）
    point: Number, //學分 （取自課程查詢下載的excel檔）
    courseNameZH_TW: { type: String }, //課程名稱（中文） （取自課程查詢下載的excel檔）
    courseName: { type: String }, //課程名稱 （取自課程查詢下載的excel檔）
    instructorZH_TW: { type: String }, //教師名稱 （取自課程查詢下載的excel檔）
    instructor: { type: String }, //教師名稱 （取自課程查詢下載的excel檔）
    departmentZH_TW: { type: String }, //開課單位 （取自課程查詢下載的excel檔）
    department: { type: String }, //開課單位 （取自課程查詢下載的excel檔）
    sessionZH_TW: { type: String }, //上課時段 （取自課程查詢下載的excel檔）
    session: { type: String }, //上課時段 （取自課程查詢下載的excel檔）
    classroom: { type: String }, //上課教室 （取自課程查詢下載的excel檔）
    typeOfCredit: { type: String }, // （取自課程查詢下載的excel檔）
    lectureLanguage: { type: String }, //教學使用語言 （取自課程查詢下載的excel檔）
    isCoreGeneral: { type: String }, //是否為核心通識 （取自課程查詢下載的excel檔）
    information: { type: String }, //詳細資訊 （取自課程查詢下載的excel檔）
    note: { type: String }, //課程註解 （取自課程查詢下載的excel檔）
    comments: { type: [String], default: [] }, //此課程的評價陣列
    avg_rate:Number, //此課程的平均評價
    avg_sweet:Number, //此課程的平均甜度
    avg_loading:Number, //此課程的平均涼度
    avg_gain:Number, //此課程的平均收穫
    num_of_feedback:Number, //此課程的評價數
    num_of_like:Number, //此課程的評價數
    type:{ type: String }, //此課程的種類：有以下幾種["DEPARTMENT","GENERAL","INTEGRATED","PE","ND"]
    subType:{ type: String }, //此課程的子種類 列舉如下
    // type為"DEPARTMENT" 的有以下幾種subtype:["CHINESE","COMPUTER_SCIENCE"...]
    // type為"GENERAL" 有以下幾種subtype:["SOCIAL","HUMANITY","ENGLISH"...] 
    // type為"INTEGRATED" 有以下幾種subtype:["CALCULUS","CIVIL_LAW"...]
    // type為"PE"(體育) 目前沒有subtype  subtype值為""
    // type為"ND"(國防) 目前沒有subtype subtype值為""
    short_code:{ type: String }, //此課程的短id code的前三碼
},{timestamps: true})


var Course = mongoose.model('Course', courseSchema );

export default Course;
