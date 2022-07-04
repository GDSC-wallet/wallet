import express from "express";
import auth from "../middleware/auth.js";
import { insert_wallet_response, update_wallet_response, delete_wallet_response, search_record_response } from '../middleware/wallet.js';
import { get_wallet, insert_wallet, update_wallet, delete_wallet, search_record } from "../controllers/wallet.js";

const router = express.Router();

router.get("/", auth, get_wallet);
router.post("/create", auth, insert_wallet, insert_wallet_response);
router.post("/edit", auth, update_wallet, update_wallet_response);
router.post("/delete", auth, delete_wallet, delete_wallet_response);
router.get("/search", auth, search_record, search_record_response);

export default router;
