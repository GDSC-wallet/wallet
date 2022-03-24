import express from 'express';

import { getFeedBack, checkExistFeedback , checkUserExistFeedback, createFeedBack, getUserFeedBack, updateFeedBack, deleteFeedBack } from '../controllers/courseFeedBack.js';

const router = express.Router();
import auth from "../middleware/auth.js";
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.post('/', createFeedBack);
router.post('/update', updateFeedBack);
router.post('/check', checkUserExistFeedback);
router.post('/delete', deleteFeedBack);
router.post('/get', getFeedBack); //只拿單個
router.post('/user', getUserFeedBack);
// router.get('/search', getBooksBySearch);
// router.post('/', getCourse);
// router.get('/dump', dumpCourse);

// router.post('/', auth,  createCourse);
// router.patch('/:id', auth, updateBook);
// router.delete('/:id', auth, deleteBook);
// router.patch('/:id/likeBook', auth, likeBook);
// router.post('/:id/commentBook', commentBook);

export default router;