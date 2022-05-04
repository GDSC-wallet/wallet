import db_caller from "../db_interact/db_caller.js";

export const get_record = async (req, res) => {
    await db_caller.call_record(/*req.body.record_id*/"record_12816023-2d25-4b47-9e51-7bc36050f0c1")
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
    await db_caller.Insert_record(req.body.record_wallet_id, req.body.wallet_record_tag_id, req.body.record_ordinary, req.body.record_name, req.body.record_description, req.body.record_amount, req.body.record_type, req.body.record_date)
        .then(result => {
            var response = {
                "success": true,
                "message": "創建record成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "創建record失敗 error: " + err.message,
                "data": {}
            }
            res.status(201).json(response);
        })
};
export const update_record = async (req, res) => { 
    await db_caller.Update_wallet(req.body.record_id, req.body.wallet_record_tag_id, req.body.record_ordinary, req.body.record_name, req.body.record_description, req.body.record_amount, req.body.record_type, req.body.record_date) 
        .then(result => {
            var response = {
                "success": true,
                "message": "更新record成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "更新record失敗 error: " + err.message,
                "data": {}
            }
            res.status(201).json(response);
        })
};

export const delete_record = async (req, res) => {
    await db_caller.Delete_record(req.body.record_id, req.body.record_wallet_id, req.body.record_amount) 
        .then(result => {
            var response = {
                "success": true,
                "message": "刪除record成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "刪除record失敗 error: " + err.message,
                "data": {}
            }
            res.status(201).json(response);
        })
};
