import express from "express";
import auth from "../middleware/auth.js";
import { get_tag_response, insert_tag_response, update_tag_response, update_all_tag_response, delete_tag_response } from "../middleware/tag.js";
import { get_tag, insert_tag, update_tag, update_all_tag, delete_tag } from "../controllers/tag.js";

const router = express.Router();

router.get("/", auth, get_tag, get_tag_response);
router.post("/create", auth, insert_tag, insert_tag_response);
router.post("/edit", auth, update_tag, update_tag_response);
router.post("/update", auth, update_all_tag, update_all_tag_response);
router.post("/delete", auth, delete_tag, delete_tag_response);

export default router;
