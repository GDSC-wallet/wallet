import express from "express";
import mongoose from "mongoose";
import final_csv from "../constants/csv2.js";
import Course from "../models/course.js";
import { getUserLikes } from "../controllers/user.js";
import { checkExistFeedback } from "../controllers/courseFeedBack.js";
import CourseFeedBack from "../models/courseFeedBack.js";

const router = express.Router();

export const getCourses = async (req, res) => {
  const course_data = req.body;
  const department = course_data.department;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await book.countDocuments({});
    const books = await book
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: books,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourse = async (req, res) => {
  const { course_id } = req.body;

  try {
    const course = await Course.find({ course: course_id });
    // console.log(course);
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourseDetail = async (req, res) => {
  const { course_id } = req.body;

  try {
    //left join feedback 跟 resource(resource可能會用另一個ajax另外拿)
    let course = await Course.findOne({ course: course_id });

    const courseFeedBacks = await CourseFeedBack.find({ course: course_id });

    // console.log(courseFeedBacks);

    // course.feedback = courseFeedBacks;

    // console.log("course_data",course_data);
    res.status(200).json({ course: course, feedback: courseFeedBacks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourseWithCheck = async (req, res) => {
  const { courseId, userId } = req.body;
  try {
    // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
    const course = await Course.findOne({ course: courseId });

    //檢查使用者是否已經有對此課程的評價：
    const check_result = await checkExistFeedback({ courseId, userId });
    if (check_result == "err") {
      res.status(400).json({ message: error.message });
    }
    res.json({ data: course, exist_feedback: check_result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCoursesBySearch = async (req, res) => {
  const { course_name, instructor_name, department_name, semester } = req.body;  

  let query={};

  // if(course_name!==undefined&&instructor_name!==undefined&&department_name!==undefined){
  //   res.json({ data: [] });
  // }

  if(course_name!==undefined){
    query.courseNameZH_TW={ $regex: course_name, $options: "i" };
  }

  if(instructor_name!==undefined){
    query.instructorZH_TW={ $regex: instructor_name, $options: "i" };
  }

  if(department_name!==undefined){
    query.departmentZH_TW={ $regex: department_name, $options: "i" };
  }

  query.semester=semester;

  try {
    const courses = await Course.find(
    //   {
    //   courseNameZH_TW: { $regex: course_name, $options: "i" },
    //   // instructorZH_TW: { $regex: "^" + instructor_name, $options: "i" },
    //   departmentZH_TW: { $regex: "^" + department_name, $options: "i" },
    //   // semester,
    // }
    query
    );
    console.log(courses);
    res.json({ data: courses });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCoursesByDepartment = async (req, res) => {
  const { department, semester } = req.body;

  try {
    // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
    const courses = await Course.find({ department: department, semester });
    res.json({ data: courses });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCoursesByInstructor = async (req, res) => {
  const { instructor, semester } = req.body;

  try {
    // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
    const courses = await Course.find({ instructor: instructor, semester });
    res.json({ data: courses });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCoursesByType = async (req, res) => {
  const { type, semester, userId } = req.body;

  if (userId === undefined) {
    try {
      // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
      const courses = await Course.find({ type: type, semester });
      res.json({ data: courses });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    try {
      // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
      const courses = await Course.find({ type: type });
      res.json({ data: courses });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

export const getCourseByUserLike = async (req, res) => {
  const { userId } = req.body;

  if (userId !== undefined) {
    try {
      //先取得這個user喜歡的所有課程id
      const course_ids = await getUserLikes(userId);
      // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
      const courses = await Course.find({ course: { $in: course_ids } });
      res.json({ data: courses });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    try {
      // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
      const courses = await Course.find({ type: type });
      res.json({ data: courses });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

export const createCourse = async (req, res) => {
  const book = req.body;

  const newBook = new Book({
    ...book,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const course = await Course.findOne({ course: id });

  course.comments.push(value.value);

  const updatedCourse = await Course.findByIdAndUpdate(
    course._id.toString(),
    course,
    { new: true }
  );
  res.json(updatedCourse);
};

export const dumpCourse = async (req, res) => {
  const book = req.body;

  final_csv.forEach(async function (item) {
    const newCourse = new Course(item);

    try {
      await newCourse.save();
      // console.log(newCourse);
    } catch (error) {}
  });

  res.status(201).json({ result: "done" });
};


//觸發更新num_of_like的api

export const updateCourse = async (courseFeedBacks, course_id) => {
  let total_rate = 0;
  let total_sweet = 0;
  let total_loading = 0;
  let total_gain = 0;
  let num_of_feedback = courseFeedBacks.length;

  let avg_rate = -1;
  let avg_sweet = -1;
  let avg_loading = -1;
  let avg_gain = -1;

  if (num_of_feedback == 0) {
    //不做事
  } else {
    courseFeedBacks.forEach(function (feedback) {
      total_rate += feedback.rate;
      total_sweet += feedback.sweet;
      total_loading += feedback.loading;
      total_gain += feedback.gain;
    });

    avg_rate = total_rate / num_of_feedback;
    avg_sweet = total_sweet / num_of_feedback;
    avg_loading = total_loading / num_of_feedback;
    avg_gain = total_gain / num_of_feedback;
  }

  const course = await Course.findOne({ course: course_id });
  course.avg_rate = avg_rate;
  course.avg_sweet = avg_sweet;
  course.avg_loading = avg_loading;
  course.avg_gain = avg_gain;
  course.num_of_feedback = num_of_feedback;

  const updatedCourse = await Course.findByIdAndUpdate(
    course._id.toString(),
    course,
    {
      new: true,
      avg_rate: avg_rate,
      avg_sweet: avg_sweet,
      avg_loading: avg_loading,
      avg_gain: avg_gain,
    }
  );
  console.log(updatedCourse);
};

export default router;
