//NODE MODULES
import express from "express";
import auth from "../middleware/auth.js";
import { get_wallet,insert_wallet,update_wallet,delete_wallet } from "../controllers/wallet.js";

const router = express.Router();

router.get("/",auth, get_wallet);
router.post("/create",auth, insert_wallet);
router.post("/edit",auth, update_wallet);
router.post("/delete",auth, delete_wallet);

export default router;