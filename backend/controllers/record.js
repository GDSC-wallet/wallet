import Record from "../db_interact/record.js";

export const get_record = async (req, res, next) => {

    const query = req.query;
    
    await Record.get_record(query.record_id)
    .then(results => {
        results.record_name = results.record_name.slice(1, results.record_name.length-1);
        results.record_description = results.record_description.slice(1, results.record_description.length-1);
        var response = {
            "success": true,
            "message": "取得record資料成功",
            "data": results
        }
        console.log(response);
        res.status(201).json(response);
    })
    .catch(err => {
        var response = {
            "success": false,
            "message": "取得record資料失敗",
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    });
};

export const insert_record = async (req, res, next) => {
    
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
        next(result);
    })
    .catch(err => {
        next(err);
    })
};

export const update_record = async (req, res, next) => {

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
        next(result);
    })
    .catch(err => {
        next(err);
    })
};

export const delete_record = async (req, res, next) => {

    const body = req.body

    await Record.delete_record(
        body.record_id,
        body.record_wallet_id,
        body.record_amount
    ).then(result => {
        next(result);
    })
    .catch(err => {
        next(err);
    })
};
