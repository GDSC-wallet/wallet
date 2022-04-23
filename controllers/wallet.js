import db_caller from "../db_interact/db_caller.js";

export const get_wallet = async (req, res) => {
    await db_caller.call_wallet(wallet_id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(result => {
        var response = {
            "success": false,
            "message": "取得使用者資料失敗",
            "data": {}
        }
        res.status(200).json(response);
    })
};
export const insert_wallet = async (req, res) => {
    res.status(201).json({ result:"success" });
};
export const update_wallet = async (req, res) => {
    res.status(201).json({ result:"success" });
};
export const delete_wallet = async (req, res) => {
    res.status(201).json({ result:"success" });
};
