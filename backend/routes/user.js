import express from "express";
import auth from "../middleware/auth.js";
import { signUp_response, update_user_response } from "../middleware/user.js";
import { signUp, getUserProfile, update_user } from "../controllers/user.js";
import { signUp_check, profile_check, update_user_check } from "../object/user.js";

const router = express.Router();

router.post("/signup", [auth, signUp_check], signUp, signUp_response);
router.post("/edit", [auth, update_user_check], update_user, update_user_response);
router.get("/profile", [auth, profile_check], getUserProfile);

export default router;
