import db_caller from "../db_interact/db_caller.js";

export const get_record = async (req, res) => {
    const {record_id} = req.params;
    await db_caller.call_record(record_id)
        .then(response => {
            res.status(201).json(response); 
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得record資料失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const insert_record = async (req, res) => {
    await db_caller.Insert_record("wallet_62e3bb62-ba78-4b77-8877-4750ba202892","tag_544df172-d1e6-4c9f-93f1-3209d73f953e",0,"測試紀錄","測試用紀錄",100,"支出","2022-05-13 02:30:46"/*req.body.record_wallet_id, req.body.wallet_record_tag_id, req.body.record_ordinary, req.body.record_name, req.body.record_description, req.body.record_amount, req.body.record_type, req.body.record_date*/)
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
            res.status(400).json(response);
        })
};

export const update_record = async (req, res) => { 
    await db_caller.Update_record("record_cfa5c052-5c59-442a-a2c0-b6cb27707f8f","tag_2a5e01a9-147f-4b2c-ae47-20cae339e01b",1,"新紀錄","更新後的紀錄",200,"收入","2022-01-01 02:25:46"/*req.body.record_id, req.body.wallet_record_tag_id, req.body.record_ordinary, req.body.record_name, req.body.record_description, req.body.record_amount, req.body.record_type, req.body.record_date*/) 
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
            res.status(400).json(response);
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
            res.status(400).json(response);
        })
};
