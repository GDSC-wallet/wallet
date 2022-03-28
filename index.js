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
    db_dealer.get_wallet('1')    // 之後parse req得到要求的user id,暫定1
        .then(results => {
            var user_status;
            var stt = db_caller.authenticate('1');  // 目前會因為非同步執行使stt為false,等之後接起來再寫promise
            if(stt)
                user_status = "success";
            else
                user_status = "error";

            // 將資料轉成需要的JSON格式
            var response = {
                status: user_status,
                message:"info for user_id1",
                data:{
                    user_id: results[0].user_id,
                    user_name: results[0].username,
                    nick_name: results[0].nick_name,
                    selected_wallet_id:"haven't done",
                    wallets:[
                        /*
                        "wallet-a":{
                            wallet_id: results[i].wallet_id,
                            wallet_name: results[i].wallet_name,
                            selected: "True", // true or false, True for now testing
                            records:[
                                {
                                    record_id:"wallet-a-record-1",
                                    wallet_record_tag_id: results[i].wallet_record_tag_id,
                                    record_ordinary: results[i].record_ordinary,
                                    record_name: results[i].record_name,
                                    record_description: results[i].description,
                                    record_amount: results[i].amount,
                                    record_type: results[i].type,
                                    record_date: results[i].date,
                                    record_created_time: results[i].record_created_time
                                }
                            ]
                        }
                        */
                    ]
                }
            }
            for(let i = 0; i < results[0].wallet_length; ++i) {
                var record_arr = [];
                for(let j = 0; j < wallet[i].record_length; ++j) {
                    var record_obj = {
                        {
                            record_id:"",
                            wallet_record_tag_id:,
                            record_ordinary:,
                            record_name:,
                            record_description:,
                            record_amount:,
                            record_type:,
                            record_data:,
                            record_created_time:,
                            record_updated_time:
                        }
                    }
                    record_arr += record_obj;
                }
                response.data.wallets[i].records += record_arr;
            }
            console.log(response);
            db_dealer.close_sql_connection();
            res.send(response);
        }).catch(err => {
            db_dealer.close_sql_connection();
            res.send(err);
        });
});
