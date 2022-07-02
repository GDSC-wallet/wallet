import db_caller from "../db_interact/db_caller.js";
import Record from "../db_interact/record.js";

export const get_record = async (req, res) => {
    /*
    const query = req.query;
    console.log('query :', query);

    await db_caller.call_record(query.record_id)
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
        */
    const query = req.query;
    await Record.get_record(query.record_id)
        .then(results => {
            console.log(results);
            res.status(201).json(results);
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

export const insert_record = async (req, res) => {
    /*
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
        */
    const body = req.body;
    if(body.record_amount == null)
        body.record_amount = 0;
    await Record.insert_record(
        body.wallet_id,
        body.wallet_record_tag_id,
        body.record_ordinary,
        body.record_name,
        body.record_description,
        body.record_amount,
        body.record_type,
        body.record_date
    ).then(result => {
        console.log("record新增成功");
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).json(result);
    })
};

export const update_record = async (req, res) => {
/*
    const body = req.body

    await db_caller.Update_record(
        body.record_id,
        body.record_wallet_id,
        body.wallet_record_tag_id,
        body.record_ordinary,
        body.record_name,
        body.record_description,
        body.record_amount,
        body.record_type,
        body.record_date,
        body.record_amount_diff
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
*/
    const body = req.body
    await Record.update_record(
        body.record_id,
        body.record_wallet_id,
        body.wallet_record_tag_id,
        body.record_ordinary,
        body.record_name,
        body.record_description,
        body.record_amount,
        body.record_type,
        body.record_date,
        body.record_amount_diff
    ).then(result => {
        console.log("更新record成功");
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).json(err);
    })
};

export const delete_record = async (req, res) => {
/*
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
*/

    const body = req.body
    await Record.delete_record(
        body.record_id,
        body.record_wallet_id,
        body.record_amount
    ).then(result => {
        console.log("刪除record成功")
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).json(err);
    })
};
