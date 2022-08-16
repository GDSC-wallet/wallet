import Record from "../db_interact/record.js";
import Debtor from "../db_interact/debtor.js";
import { v4 as uuid } from 'uuid'

export const get_record = async (req, res, next) => {

    const query = req.query;
    
    await Record.get_record(query.record_id)
    .then( async results => {
        results.record_name = results.record_name.slice(1, results.record_name.length-1);
        results.record_description = results.record_description.slice(1, results.record_description.length-1);
        // add record_debtors
        results['record_debtors'] = [];
        await Debtor.get_record_debtors(query.record_id)
            .then(result => {
                if(result.length > 0) {
                    for(var i = 0; i < result.length; ++i) {
                        result[i].debtor_name = result[i].debtor_name.slice(1, result[i].debtor_name.length-1);
                        var record_debtor_obj = {
                            debtor_id: result[i].debtor_id,
                            debtor_name: result[i].debtor_name,
                            debtor_record_amount: result[i].debtor_record_amount
                        }
                        results.record_debtors.push(record_debtor_obj);
                    }
                }
            })
            .catch(err => { throw err })
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
            "message": "取得record資料失敗 error2: " + err.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    });
};

export const get_month_records = async (req, res, next) => {

    const { wallet_id, time_choosen } = req.query;

    await Record.get_month_records(wallet_id, time_choosen)
        .then( async results => { 
            var response = {
                "success": true,
                "message": "取得指定月份records資料成功",
                "data": []
            }
            console.log(results);
            for(var i = 0; i < results.length; ++i) {
                var record_obj = {
                    "record_id": results[i].record_id,
                    "wallet_record_tag_id": results[i].wallet_record_tag_id,
                    "record_ordinary": results[i].record_ordinary,
                    "record_name": results[i].record_name.slice(1, results[i].record_name.length-1),
                    "record_description": results[i].record_description.slice(1, results[i].record_description.length-1),
                    "record_amount": results[i].record_amount,
                    "record_type": results[i].record_type,
                    "record_date": results[i].record_date,
                    "record_debtors": [],
                    "record_created_time": results[i].record_created_time,
                    "record_updated_time": results[i].record_updated_time
                }
                await Debtor.get_record_debtors(results[i].record_id)
                    .then(result => {
                        if(result.lenght > 0) {
                            for(var j = 0; j < result.length; ++j) {
                                result[j].debtor_name = result[j].debtor_name.slice(1, result[j].debtor_name.length-1);
                                var record_debtor_obj = {
                                    debtor_id: result[j].debtor_id,
                                    debtor_name: result[j].debtor_name,
                                    debtor_record_amount: result[j].debtor_record_amount
                                }
                                record_obj.record_debtors.push(record_debtor_obj);
                            }
                        }
                    })
                    .catch(err => { throw err })
                response.data.push(record_obj);
            }
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得指定月份records資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        })
}

export const insert_record = async (req, res, next) => {
    
    const body = req.body;
    
    if(body.record_amount == null)
        body.record_amount = 0;

    var record_id = "record_" + uuid();
    await Record.insert_record(
        record_id,
        body.wallet_id,
        body.wallet_record_tag_id,
        body.record_ordinary,
        body.record_name,
        body.record_description,
        body.record_amount,
        body.record_type,
        body.record_date
    ).then( async result => {
        if(body.record_debtors) {
            for(var i = 0; i < body.record_debtors.length; ++i) {
                await Debtor.insert_debtor_record(
                    record_id,
                    body.record_debtors[i].debtor_id,
                    body.record_debtors[i].debtor_record_amount
                ).catch(err => {
                    next(err);
                })
            }
        }
        next(result);
    })
    .catch(err => {
        next(err);
    })
};

export const batch_record = async (req, res, next) => {
    
    const records = req.body.records;
    
    //預先將record_id加入records,提供insert_debtor_record
    for(let i = 0; i < records.length; ++i) {
        records[i].record_id = "record_" + uuid();
    }

    await Record.batch_record(
        records
    ).then( async result => {
        for(let i = 0; i < records.length; ++i) {
            if(records[i].record_debtors) {
                for(let j = 0; j < records[i].record_debtors.length; ++j) {
                    var debtors = records[i].record_debtors
                    await Debtor.insert_debtor_record(
                        records[i].record_id,
                        debtors.debtor_id,
                        debtors.debtor_record_amount
                    ).catch(err => {
                        next(err);
                    }) 
                }
            }
        }
        next(result);
    }).catch(err => {
        next(err);
    })

}


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
        body.record_amount_diff,
    ).then(async result => {
        if(body.record_debtors) {
            // 查看此record目前的debtors並執行新增或刪除
            await Debtor.get_record_debtors(body.record_id)
                .then(async results => {
                    // 將results的debtor_id存入originIds
                    // results的debtor_record_amount存入originAmounts
                    var originIds = [];
                    var originAmounts = [];
                    results.forEach(result => {
                        originIds.push(result.debtor_id);
                        originAmounts.push(result.debtor_record_amount);
                    })
                    // 將record_debtors的debtor_id存入alterIds
                    // record_debtors的debtor_record_amount存入alterAmounts
                    var alterIds = [];
                    var alterAmounts = [];
                    body.record_debtors.forEach(result => {
                        alterIds.push(result.debtor_id);
                        alterAmounts.push(result.debtor_record_amount);
                    })
                    for(let i = 0; i < alterIds.length; ++i) {
                        // 將被新增的debtor新增
                        if(originIds.indexOf(alterIds[i]) === -1) {
                            await Debtor.insert_debtor_record(
                                body.record_id,
                                alterIds[i],
                                alterAmounts[i]
                            ).then().catch(err => { throw err })
                        }
                    }
                    for(let i = 0; i < originIds.length; ++i) {
                        // 將被刪除的debtor刪除
                        if(alterIds.indexOf(originIds[i]) === -1) {
                            await Debtor.delete_debtor_record(
                                body.record_id,
                                originIds[i],
                                originAmounts[i]
                            ).then().catch(err => { throw err })
                        }
                    }
                })
                .catch(err => { throw err })
        }
        next(result);
    }).catch(err => {
        next(err);
    })
};

export const delete_record = async (req, res, next) => {

    const body = req.body

    await Record.delete_record(
        body.record_id,
        body.record_wallet_id,
        body.record_amount,
    ).then(async result => {
        if(body.record_debtors) {
            for(var i = 0; i < body.record_debtors.length; ++i) {
                await Debtor.delete_debtor_record(
                    body.record_id,
                    body.record_debtors[i].debtor_id,
                    body.record_debtors[i].debtor_record_amount)
                    .catch(err => {
                        next(err);
                    })
            }
        }
        next(result);
    })
    .catch(err => {
        next(err);
    })
};
