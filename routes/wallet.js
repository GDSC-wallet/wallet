import express from "express";
import auth from "../middleware/auth.js";
import { get_wallet,insert_wallet,update_wallet,delete_wallet } from "../controllers/wallet.js";

const router = express.Router();

router.get("/", get_wallet);
router.post("/create", insert_wallet);
router.post("/edit", update_wallet);
router.post("/delete", delete_wallet);

/* 測試階段，先不驗證jwt
router.get("/",auth, get_wallet);
router.post("/create",auth, insert_wallet);
router.post("/edit",auth, update_wallet);
router.post("/delete",auth, delete_wallet);
*/

export default router;