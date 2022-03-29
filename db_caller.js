const db_dealer = require('./db_dealer.js')
const express = require('express')
const app = express()
const port = 3000


// 問資料庫user是否存在
const authenticate = (id) => {
    return new Promise((resolve, reject) => {
        db_dealer.user_exist(id)
            .then(results => {
                if(results.length == 0) {
                    return false;
                } else {
                    return true;
                }
            }).catch(err => {
                console.log("ERROR: " + err.message);
                return false;
            });
    });
}

const user_data = () => {
    return new Promise( async (resolve, reject) => {
        var user_status;
        var selected_wallet;
        var response = {};
        await db_dealer.get_user('1')    // 之後parse req得到要求的user id,暫定1
            .then(results => {
                if(results.length > 0)
                    user_status = "success";
                else
                    user_status = "error";

                // 確認被選擇的wallet, 而被選擇的wallet必須只有一個
                for(let i = 0; i < results.length; ++i) {
                    if(results[i].selected == 1) {
                        selected_wallet = results[i].wallet_id;
                        break;
                    }
                }

                // 將資料轉成需要的JSON格式
                var data = {
                    status: user_status,
                    message:"info for user_id1",
                    data:{
                        user_id: results[0].user_id,
                        user_name: results[0].username,
                        nick_name: results[0].nick_name,
                        selected_wallet_id: selected_wallet,
                        wallets:[
                        ]
                    }
                };

                // 填寫wallets陣列和wallets陣列中的records陣列
                var idx = 0;    // the results' index
                for(let i = 0; i < results[0].wallet_num; ++i) {
                    // construct a wallet object
                    var wallet_obj = {
                        wallet_id: results[idx].wallet_id,
                        wallet_name: results[idx].wallet_name,
                        selected: results[idx].selected,   // only true for now testing
                        records:[]
                    };
                    // construct a record array
                    var record_arr = [];
                    for(let j = 0; j < results[idx].record_num; ++j) {
                        var record_obj = {
                            record_id: results[idx+j].record_id,
                            wallet_record_tag_id: results[idx+j].wallet_record_tag_id,
                            record_ordinary: results[idx+j].record_ordinary,
                            record_name: results[idx+j].record_name,
                            record_description: results[idx+j].desciption,
                            record_amount: results[idx+j].amount,
                            record_type: results[idx+j].type,
                            record_date: results[idx+j].date,
                            record_created_time: results[idx+j].record_created_time,
                            record_updated_time: results[idx+j].record_updated_time
                        }
                        record_arr.push(record_obj);
                    }
                    idx += results[idx].record_num;
                    // put record array into wallet object and pu wallet object into response.data.wallets
                    wallet_obj.records = record_arr;
                    data.data.wallets.push(wallet_obj);
                }

                console.log("data is: ");
                console.log(data);
                response = data;
                db_dealer.close_sql_connection();
            }).catch(err => {
                db_dealer.close_sql_connection();
            });
        resolve(response);
    });
}
exports.user_data = user_data;
exports.authenticate = authenticate;
