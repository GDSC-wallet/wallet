import express from "express";
import auth from "../middleware/auth.js";
import { signUp,getUserProfile } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", auth, signUp);
router.get("/profile", auth, getUserProfile); // 除了parse request以外 完成

export default router;
