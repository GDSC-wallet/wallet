import express from "express";
import mongoose from "mongoose";
import final_csv from "../constants/csv.js"
import { updateCourse } from "./course.js";
import CourseFeedBack from "../models/courseFeedBack.js";
import Course from "../models/course.js";

const router = express.Router();

export const getUserFeedBack = async (req, res) => {

  const {userId} = req.body;

  try {
    // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
    const feedbacks = await CourseFeedBack.find({ user: userId}).lean();

    const result = await Promise.all(feedbacks.map(async (item)=>{

      let course = item.course;
      item.course_data = await Course.findOne({course:course},{});

      return item
    })
    )

    res.json({ data: feedbacks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getFeedBack = async (req, res) => {

  const {courseId,userId} = req.body;

  try {
    // const courses = await Course.find({ "department": { $regex: '.*' + department + '.*' } });
    const feedback = await CourseFeedBack.findOne({ course:courseId,user: userId});
    res.json({ data: feedback });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkExistFeedback = async (data) => {
  
  const {courseId,userId} = data;

  try {
    const feedback = await CourseFeedBack.findOne({ course:courseId,user: userId});    
    if(feedback==null) {
      return false
    }else{
      return true;
    }   

  } catch (error) {
    return "err"
  }
};

export const checkUserExistFeedback = async (req,res) => {
  
  const {courseId,userId} = req.body;

  try {
    const feedback = await CourseFeedBack.findOne({ course:courseId,user: userId});    
    console.log(feedback)
    res.status(200).json({feedback});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const createFeedBack = async (req, res) => {
  const feedback = req.body;

  const newFeedBack = new CourseFeedBack({
    ...feedback,
    createdAt: new Date().toISOString(),
  });

  try {
    await newFeedBack.save();
    res.status(201).json({newFeedBack});

    //回傳之後，更新該課程的總評價 涼/甜/收穫
    const course_id=feedback.course;
    const courseFeedBacks = await CourseFeedBack.find({"course":course_id});	
    updateCourse(courseFeedBacks,course_id);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateFeedBack = async (req, res) => {
  const feedback = req.body;
  const {_id,rate,sweet,loading,gain,introduction,description} = feedback;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    const updatedFeedBack = { rate,sweet,loading,gain,introduction,description };
  
    await CourseFeedBack.findByIdAndUpdate(_id, updatedFeedBack, { new: true });
  
    //回傳之後，更新該課程的總評價 涼/甜/收穫
    const course_id=feedback.course;
    const courseFeedBacks = await CourseFeedBack.find({"course":course_id});	
    updateCourse(courseFeedBacks,course_id);
  
    res.status(201).json(updatedFeedBack);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const deleteFeedBack = async (req, res) => {
  const { _id } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No feedback with id: ${id}`);
    const course = await CourseFeedBack.findById(_id);
    await CourseFeedBack.findByIdAndRemove(_id);
  
    //回傳之後，更新該課程的總評價 涼/甜/收穫
    const course_id=course.course;
    const courseFeedBacks = await CourseFeedBack.find({"course":course_id});	
    updateCourse(courseFeedBacks,course_id);
  
    res.json({ message: "feedback deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}


export const dumpCourse = async (req, res) => {
  const book = req.body;

  final_csv.forEach(async function (item){

    const newCourse = new Course(item);
  
    try {
      await newCourse.save();
      // console.log(newCourse);
    } catch (error) {

    }
  })

  res.status(201).json({"result":"done"});
};


export default router;
