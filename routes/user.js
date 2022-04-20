import express from "express";
import auth from "../middleware/auth.js";
import { getUserProfile,signUp } from "../controllers/user.js";
const router = express.Router();

router.post("/profile",auth, getUserProfile);
router.post("/signup",auth, signUp);

export default router;