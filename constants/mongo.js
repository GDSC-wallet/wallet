import mongoose from 'mongoose';
import Course from "../models/course.js";
import * as fs from 'fs';


const CONNECTION_URL = 'mongodb+srv://william:reverse321@cluster0.mhbnf.mongodb.net/nccu-course-guide?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true})
  .then(getCourseData())
  .catch((error) => console.log(`${error} did not connect`));

async function getCourseData(){

    try {
        const courses = await Course.find(
        //   {
        //   courseNameZH_TW: { $regex: course_name, $options: "i" },
        //   // instructorZH_TW: { $regex: "^" + instructor_name, $options: "i" },
        //   departmentZH_TW: { $regex: "^" + department_name, $options: "i" },
        //   // semester,
        // }
        {semester:"1101"}
        );
        console.log(courses);
        var json = JSON.stringify(courses);
        fs.writeFile('courses.json', json, 'utf8', ()=>console.log("done"));
        // res.json({ data: courses });
      } catch (error) {
        // res.status(404).json({ message: error.message });
        console.log("error",error)
      }


}

