import Debtor from "../db_interact/debtor.js";

// 基本上不會用到
export const get_record_debtors = async (req, res, next) => {
    const { record_id } = req.query;

    await Debtor.get_record_debtors(record_id)
        .then(results => {
            var response = {
                "success": true,
                "message": "取得帳目債務人資料成功",
                "data": {
                    "record_debtors": []
                }
            };
            if(results.length > 0) {
                for(var i = 0; i < results.length; ++i) {
                    results[i].debtor_name = results[i].debtor_name.slice(1, results[i].debtor_name.length-1);
                    var record_debtor_obj = {
                        debtor_id: results[i].debtor_id,
                        debtor_name: results[i].debtor_name,
                        debtor_record_amount: results[i].debtor_record_amount
                    }
                    response.data.record_debtors.push(record_debtor_obj);
                }
            }
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得帳目債務人資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
    console.log(response);
    res.status(201).json(response);
}


export const get_debtor_records = async (req, res, next) => {
    
    const { debtor_id } = req.query;

    await Debtor.get_debtor_records(debtor_id)
        .then( async results => {
            var response = {
                "success": true,
                "message": "取得債務人帳目資料成功",
                "data": {
                    "debtor_records": []
                }
            }
            if(results.length > 0) {
                for(var i = 0; i < results.length; ++i) {
                    results.record_name = results.record_name.slice(1, results.record_name.length-1);
                    results.record_description = results.record_description.slice(1, results.record_description.length-1);
                    var record_data = {
                        "record_id": results[i].record_id,
                        "wallet_record_tag_id": results[i].wallet.record_tag_id,
                        "record_ordinary": results[i].record_ordinary,
                        "record_name": results[i].record_name,
                        "record_description": results[i].record_description,
                        "record_amount": results[i].record.amount,
                        "record_type": results[i].record_type,
                        "record_date": results[i].record_date,
                        "record_debtors": [],
                        "record_created_time": results[i].record_created_time,
                        "record_updated_time": results[i].record_updated_time
                    }
                    await Debtor.get_record_debtors(results[i].record_id)
                        .then(result => {
                            if(result.length > 0) {
                                for(var j = 0; j < result.length; ++j) {
                                    result[j].debtor_name = result[j].debtor_name.slice(1, result[j].debtor_name.length-1);
                                    var record_debtor_obj = {
                                        debtor_id: result[j].debtor_id,
                                        debtor_name: result[j].debtor_name,
                                        debtor_record_amount: result[j].debtor_record_amount
                                    }
                                    results.record_debtors.push(record_debtor_obj);
                                }
                            }
                        })
                    response.data.debtor_records.push(record_data);
                }
            }
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得債務人帳目資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
    console.log(response);
    res.status(201).json(response)
}


export const get_all_debtors = async (req, res, next) => {

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.session?.passport?.user?.user_id;

    await Debtor.get_all_debtors(user_id)
        .then(results => {
            var response = {
                "success": true,
                "message": "取得使用者所有債務人資料成功",
                "data": {
                    "debtors": []
                }
            };
            if(results.length > 0) {
                for(var i = 0; i < results.length; ++i) {
                    results[i].debtor_name = results[i].debtor_name.slice(1, results[i].debtor_name.length-1);
                    var debtor_obj = {
                        debtor_id: results[i].debtor_id,
                        debtor_user_id: results[i].debtor_user_id,
                        debtor_name: results[i].debtor_name,
                        debtor_amount: results[i].debtor_amount,
                        debtor_created_time: results[i].debtor_created_time,
                        debtor_updated_time: results[i].debtoe_updated_time
                    }
                    response.data.debtors.push(debtor_obj);
                }
            }
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得使用者所有債務人資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
    console.log(response);
    res.status(201).json(response);
}


export const insert_debtor = async (req, res, next) => {

    const { debtor_name } = req.body;

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const debtor_user_id = req.session?.passport?.user?.user_id;
    await Debtor.insert_debtor(debtor_user_id, debtor_name)
        .then(result => {
            next();
        })
        .catch(err => {
            next(err);
        })
}


export const insert_debtor_record = async (req, res, next) => {
    
    const { record_id, debtor_id } = req.body;

    await Debtor.insert_debtor_record(record_id, debtor_id)
        .then(result => {
            next();
        })
        .catch(err => {
            next(err);
        })
}


export const delete_debtor_record = async (req, res, next) => {

    const { record_id, debtor_id } = req.body;

    await Debtor.delete_debtor_record(record_id, debtor_id)
        .then(result => {
            next();
        })
        .catch(err => {
            next(err);
        })
}


export const update_debtor = async (req, res, next) => {

    const { debtor_id, debtor_name } = req.body;

    await Debtor.update_debtor(debtor_id, debtor_name)
        .then(result => {
            next();
        })
        .catch(err => {
            next(err);
        })
}


export const delete_debtor = async (req, res, next) => {

    const { debtor_id } = req.body;

    await Debtor.delete_debtor(debtor_id)
        .then(result => {
            next();
        })
        .catch(err => {
            next(err);
        })
}
