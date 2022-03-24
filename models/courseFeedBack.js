import mongoose from 'mongoose';

const courseFeedBackSchema = mongoose.Schema({  
    id:String, //(PK)  
    rate: Number, //評價
    sweet: Number, //甜度
    loading: Number, //涼度
    gain: Number, //收獲
    introduction: String, //懶人包
    description: String, //評價內容
    user: String, //使用者id
    user_nickname: String, //使用者暱稱
    course: String, //課程id (FK)
    course_semester: String, //e.g. "1101"
    course_code: String, //由政大編碼的九碼課程id
    num_of_thumbsup: Number, //按讚數
},{timestamps: true})

var CourseFeedBack = mongoose.model('CourseFeedBack', courseFeedBackSchema );

export default CourseFeedBack;