import db_caller from "../db_interact/db_caller.js";

export const get_record = async (req, res) => {
    await db_caller.call_record(req.body.record_id)
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得record資料失敗 error: " + err.message,
                "data": {}
            }
            res.status(201).json(response);
        })
};
export const insert_record = async (req, res) => {
    res.status(201).json({ result:"success" });
};
export const update_record = async (req, res) => {
    res.status(201).json({ result:"success" });
};
export const delete_record = async (req, res) => {
    res.status(201).json({ result:"success" });
};
