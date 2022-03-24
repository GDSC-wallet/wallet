import express from "express";
import mongoose from "mongoose";
import final_csv from "../constants/csv2.js";
import Course from "../models/course.js";
import Product from "../models/product.js"
import { getUserLikes } from "./user.js";
import { checkExistFeedback } from "./courseFeedBack.js";
import CourseFeedBack from "../models/courseFeedBack.js";

const router = express.Router();

export const getProduct = async (req, res) => {
  console.log('getProduct req :', req.body);
  const sellerData = req.body;
  const result = await Product.getProduct(sellerData).catch(e => console.error(e.stack));
  console.log('result :', result);
  if(result.status=="success"){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
};

export const getAllProduct = async (req, res) => {
  console.log('getAllProduct req :', req.body);
  const sellerData = req.body;
  const result = await Product.getAllProduct(sellerData).catch(e => console.error(e.stack));
  // console.log('result :', result);
  if(result.status=="success"){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
};

export const createProduct = async (req, res) => {
  console.log('req :', req.body);
  const product = req.body;
  const result = await Product.createProduct(product).catch(e => console.error(e.stack));
  console.log('result :', result);
  if(result.status=="success"){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
};
export const updateProduct = async (req, res) => {
  console.log('updateProduct req :', req.body);
  // const product = req.body;
  // const result = await Product.createProduct(product).catch(e => console.error(e.stack));
  // console.log('result :', result);
  // if(result.msg=="success"){
  //   res.status(200).json(result);
  // }else{
  //   res.status(400).json(result);
  // }
};
export const deleteProduct = async (req, res) => {
  console.log('deleteProduct req :', req.body);
  const product = req.body;
  const result = await Product.deleteProduct(product).
  catch(
    //系統內部錯誤
    e => {
      console.error(e.stack)
      res.status(500);
    });
  console.log('result :', result);
  if(result.status=="success"){

    //系統執行沒有問題 且 商業邏輯 都是對的
    res.status(200).json(result);
  }else{
    
    //商業邏輯錯誤 或是 SQL那邊有問題 但使用者不需要知道什麼問題 //可能是沒有更新到 但是是執行成功的
    res.status(400).json(result);
  }
};

export const updateProudctStatus = async (req, res) => {
  console.log('updateProudctStatus req :', req.body);
  const product = req.body;
  const result = await Product.updateProudctStatus(product).catch(e => console.error(e.stack));
  console.log('result :', result);
  if(result.status=="success"){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
};

export default router;
