import express from 'express';

import { createProduct,updateProduct,deleteProduct,updateProudctStatus,getProduct,getAllProduct} from '../controllers/product.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post('/create',auth, createProduct);
router.post('/update',auth, updateProduct);
router.post('/delete', deleteProduct);
router.post('/update/status',auth, updateProudctStatus);

router.post('/all',auth, getAllProduct);

//因為SSG 關掉AUTH
router.post('/get', getProduct);

export default router;