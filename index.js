const db_caller = require('./db_caller.js')
const db_dealer = require('./db_dealer.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended : false }));
app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

app.get('/user/data/get' ,(req, res) => {
    db_dealer.get_user('1')    // 之後parse req得到要求的user id,暫定1
        .then(results => {
            var user_status;
            if(results.length > 0)
                user_status = "success";
            else
                user_status = "error";

            // 確認被選擇的wallet
            var selected_wallet;
            for(let i = 0; i < results.length; ++i) {
                // 必須確保只有一個被選擇的wallet
                if(results[i].selected == 1) {
                    selected_wallet = results[i].wallet_id;
                    break;
                }
            }

            // 將資料轉成需要的JSON格式
            var response = {
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
                response.data.wallets.push(wallet_obj);
            }
            
            console.log("response is: ");
            console.log(response);
            db_dealer.close_sql_connection();
            res.send(response);
        }).catch(err => {
            db_dealer.close_sql_connection();
            res.send(err);
        });
});
