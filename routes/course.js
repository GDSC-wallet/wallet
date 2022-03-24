import express from 'express';

import { getCourses, getCourse,getCoursesBySearch, getCourseWithCheck, getCoursesByDepartment, getCoursesByInstructor, getCoursesByType, getCourseByUserLike, createCourse, getCourseDetail, commentPost, dumpCourse } from '../controllers/course.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post('/search', getCoursesBySearch);
router.post('/department', getCoursesByDepartment);
router.post('/instructor', getCoursesByInstructor);
router.post('/type', getCoursesByType);
router.post('/userlike', getCourseByUserLike)
// router.get('/search', getBooksBySearch);
router.post('/', getCourse);
router.post('/check', getCourseWithCheck);
router.post('/detail', getCourseDetail);
router.get('/dump', dumpCourse);

router.post('/', auth,  createCourse);
router.post('/:id/commentPost', commentPost);
// router.patch('/:id', auth, updateBook);
// router.delete('/:id', auth, deleteBook);
// router.patch('/:id/likeBook', auth, likeBook);
// router.post('/:id/commentBook', commentBook);

export default router;