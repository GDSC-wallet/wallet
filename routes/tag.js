import express from "express";
import auth from "../middleware/auth.js";
import { get_tag,insert_tag,update_tag,delete_tag } from "../controllers/tag.js";

const router = express.Router();

router.get("/", get_tag);
router.post("/create", insert_tag);
router.post("/edit", update_tag);
router.post("/delete", delete_tag);

/* 測試階段，先不驗證jwt
router.get("/",auth, get_tag);
router.post("/create",auth, insert_tag);
router.post("/edit",auth, update_tag);
router.post("/delete",auth, delete_tag);
*/

export default router;