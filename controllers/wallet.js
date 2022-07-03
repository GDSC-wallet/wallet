import Wallet from "../db_interact/wallet.js";
import User from "../db_interact/user.js";

export const get_wallet = async (req, res, next) => {
    const { wallet_id, time_choosen } = req.query;

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.session?.passport?.user?.user_id;

    await Wallet.get_wallet(user_id, wallet_id, time_choosen)
        .then(async results => {
            // result[0] is OkPacket
            var response = {
                "success": true,
                "message": "取得wallet資料成功",
                "data": {
                    "wallet_id": results[1][0].wallet_id,
                    "wallet_name": results[1][0].wallet_name,
                    "wallet_total": results[1][0].wallet_total,
                    "wallet_description": results[1][0].wallet_description,
                    "record_num": results[1][0].record_num,
                    "records": [],
                    "tags": []
                }
            };
            //console.log(results);
            for(var i = 0; i < results[1][0].record_num; ++i) {
                if(i >= results[1].length) break;
                var record_data = {
                    "record_id": results[1][i].record_id,
                    "wallet_record_tag_id": results[1][i].wallet_record_tag_id,
                    "record_ordinary": results[1][i].record_ordinary,
                    "record_name": results[1][i].record_name,
                    "record_description": results[1][i].record_description,
                    "record_amount": results[1][i].record_amount,
                    "record_type": results[1][i].record_type,
                    "record_date": results[1][i].record_date,
                    "record_created_time": results[1][i].record_created_time,
                    "record_updated_time": results[1][i].record_updated_time
                }
                //console.log(record_data);
                response.data.records.push(record_data);
            }
            await User.get_wallet_tag(wallet_id)
                .then(results => {
                    var tag_arr = [];
                    for(var i = 0; i < results.length; ++i) {
                        var tag_obj = {
                            tag_id: results[i].tag_id,
                            tag_wallet_id: results[i].tag_wallet_id,
                            tag_ordinary: results[i].tag_ordinary,
                            tag_name: results[i].tag_name,
                            tag_type: results[i].tag_type,
                            tag_created_time: results[i].tag_created_time,
                            tag_updated_time: results[i].tag_updated_time,
                            tag_color: results[i].tag_color
                        }
                        tag_arr.push(tag_obj);
                    }
                    //console.log(tag_arr);
                    response.data.tags = tag_arr;
                })
                .catch(err => {
                    var response = {
                        "success": false,
                        "message": "取得wallet資料失敗 error: " + err.message,
                        "data": {}
                    }
                    console.log(response);
                    res.status(400).json(response);
                })
            console.log(response);
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得wallet資料失敗 error: " + err.message,
                "data": {}
            }
            console.log(response);
            res.status(400).json(response);
        });
}

export const insert_wallet = async (req, res, next) => {

    const { wallet_name, wallet_description } = req.body;

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.session?.passport?.user?.user_id;

    await Wallet.insert_wallet(user_id, wallet_name, wallet_description)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};

export const update_wallet = async (req, res, next) => {
    const { wallet_id, wallet_name, wallet_description } = req.body
    await Wallet.update_wallet(wallet_id, wallet_name, wallet_description)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};

export const delete_wallet = async (req, res, next) => {
    const { wallet_id } = req.body

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.session?.passport?.user?.user_id;

    await Wallet.delete_wallet(user_id, wallet_id)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
};

// 未實做
/*
export const update_wallet_tag = async (req, res, next) => {

    const {user_id,wallet_id} = req.body
    await Wallet.delete_wallet(user_id, wallet_id)
        .then(result => {
            console.log("更新wallet_tag成功");
            next(result);
        })
        .catch(err => {
            next(err);
        })
};
*/
