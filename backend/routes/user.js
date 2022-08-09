import express from "express";
import auth from "../middleware/auth.js";
import { signUp_response, update_user_response } from "../middleware/user.js";
import { signUp, getUserProfile, update_user } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", auth, signUp, signUp_response);
router.post("/edit", auth, update_user, update_user_response);
router.get("/profile", auth, getUserProfile);

export default router;
