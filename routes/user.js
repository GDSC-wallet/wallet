import express from "express";
import auth from "../middleware/auth.js";
import { signUp_response } from "../middleware/user.js";
import { signUp,getUserProfile } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", auth, signUp, signUp_response);
router.get("/profile", auth, getUserProfile);

export default router;
