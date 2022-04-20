//NODE MODULES
import express from "express";
import auth from "../middleware/auth.js";
import { get_record,insert_record,update_record,delete_record } from "../controllers/record.js";

const router = express.Router();

router.get("/",auth, get_record);
router.post("/create",auth, insert_record);
router.post("/edit",auth, update_record);
router.post("/delete",auth, delete_record);

export default router;