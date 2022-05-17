import db_caller from "../db_interact/db_caller.js";

export const get_record = async (req, res) => {
    const body = req.body;

    await db_caller.call_record(body.record_id)
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
    const body = req.body;

    await db_caller.Insert_record(
        body.wallet_id,
        body.wallet_record_tag_id,
        body.record_ordinary,
        body.record_name,
        body.record_description,
        body.record_amount,
        body.record_type,
        body.record_date
    ).then(result => {
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
    const body = req.body

    await db_caller.Update_record(
        body.record_id,
        body.wallet_record_tag_id,
        body.record_ordinary,
        body.record_name,
        body.record_description,
        body.record_amount,
        body.record_type,
        body.record_date
    ).then(result => {
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
    const body = req.body

    await db_caller.Delete_record(
        body.record_id,
        body.record_wallet_id,
        body.record_amount
    ).then(result => {
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
