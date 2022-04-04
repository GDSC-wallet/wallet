const db_dealer = require('./db_dealer.js')
const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3000


// 問資料庫user是否存在
const authenticate = (id) => {
    return new Promise( async(resolve, reject) => {
        await db_dealer.user_exist(id)
            .then(results => {
                if(results.length == 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }).catch(err => {
                console.log("ERROR: " + err.message);
                reject(err);
            });
    });
}
const user_data = () => {
    return new Promise( async (resolve, reject) => {
        // await db_dealer.insert_user('google','1','roych.shao@gmail.com','Roy Shao','roy');
        //await db_dealer.delete_user('user_7417323a-a5f6-414a-b2e6-2c3d8d69f754');
        //await db_dealer.insert_wallet('user_7552f100-eba2-44e1-bc7f-7a1690fd4913', 0, 'wallet_1', 1000, 'my wallet','my own wallet');
        //await db_dealer.delete_wallet('3','wallet_0754c072-ebe3-407d-9eb9-0f19429a3559');
        //await db_dealer.insert_record('wallet_97e2315d-8f4b-48c4-926c-e1c62dfda11c','tag_1',1,'test_record','no',9898,'income','2022-04-03 21:00:00');
        var user_status;
        var selected_wallet;
        var response = {};
        await db_dealer.get_user('user_7552f100-eba2-44e1-bc7f-7a1690fd4913')    // 之後parse req得到要求的user id,暫定1
            .then(results => {
                if(results.length > 0)
                    user_status = "true";
                else
                    user_status = "false";
                // 確認被選擇的wallet, 而被選擇的wallet必須只有一個
                for(let i = 0; i < results.length; ++i) {
                    if(results[i].selected == 1) {
                        selected_wallet = results[i].wallet_id;
                        break;
                    }
                }

                // 將資料轉成需要的JSON格式
                var Data = {
                    success: user_status,
                    message:"info for user_id1",
                    data:{
                        user_id: results[0].id,
                        username: results[0].username,
                        nickname: results[0].nickname,
                        selected_wallet_id: selected_wallet,
                        wallets:[
                        ]
                    }
                };

                // 填寫wallets陣列和wallets陣列中的records陣列
                var idx = 0;    // the results' index
                for(let i = 0; i < results[0].wallet_num; ++i) {

                    // 避免報錯, 如果idx >= results.length則表示已經沒有資料
                    if(idx >= results.length){ 
                        break;
                    }
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
                            record_description: results[idx+j].record_description,  //
                            record_amount: results[idx+j].record_amount,    //
                            record_type: results[idx+j].record_type,    //
                            record_date: results[idx+j].record_date,    //
                            record_created_time: results[idx+j].record_created_time,
                            record_updated_time: results[idx+j].record_updated_time
                        }
                        record_arr.push(record_obj);
                    }
                    if(results[idx].record_num == 0)
                        idx += 1;
                    else
                        idx += results[idx].record_num;
                    // put record array into wallet object and put wallet object into response.data.wallets
                    wallet_obj.records = record_arr;
                    console.log(wallet_obj);
                    Data.data.wallets.push(wallet_obj);
                }
                console.log("Data is: ");
                console.log(Data);
                response = Data;

                //console.log(results);
                //resolve(results);
            }).catch(err => {
                console.log('ERROR: ' + err.message);
                reject(err);
            });
        resolve(response);
    });
}

// 暫時先不做關閉資料庫的動作

exports.user_data = user_data;
exports.authenticate = authenticate;
