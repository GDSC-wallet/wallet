import express from "express";
import auth from "../middleware/auth.js";
import { getHeaders, getDetails } from "../controllers/einvoice.js";
import { getHeaders_check, getDetails_check } from "../object/einvoice.js";

const router = express.Router();

router.get("/headers", [auth, getHeaders_check], getHeaders);
router.get("/details", [auth, getDetails_check], getDetails);

export default router;
