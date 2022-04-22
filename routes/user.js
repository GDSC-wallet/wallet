//NODE MODULES
import express from "express";
import auth from "../middleware/auth.js";
import { signUp,getUserProfile } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", auth, signUp);
router.get("/profile", auth, getUserProfile);

export default router;
