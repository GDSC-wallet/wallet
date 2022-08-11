import express from "express";
import auth from "../middleware/auth.js";
import { insert_wallet_response, update_wallet_response, delete_wallet_response } from '../middleware/wallet.js';
import { get_wallet, insert_wallet, update_wallet, delete_wallet, search_record } from "../controllers/wallet.js";
import { get_wallet_check, search_record_check, insert_wallet_check, update_wallet_check, delete_wallet_check } from "../object/wallet.js";

const router = express.Router();

router.get("/", [auth, get_wallet_check], get_wallet);
router.post("/create", [auth, insert_wallet_check], insert_wallet, insert_wallet_response);
router.post("/edit", [auth, update_wallet_check], update_wallet, update_wallet_response);
router.post("/delete", [auth, delete_wallet_check], delete_wallet, delete_wallet_response);
router.get("/search", [auth, search_record_check], search_record);

export default router;
