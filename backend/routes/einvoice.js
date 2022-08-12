import express from "express";
import auth from "../middleware/auth.js";
import { getEinvoice } from "../controllers/einvoice.js";
import { getEinvoice_check } from "../object/einvoice.js";

const router = express.Router();

router.get("/", [auth, getEinvoice_check], getEinvoice);

export default router;
