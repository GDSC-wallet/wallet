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
            stt = db_caller.authenticate('1');
            if (stt === true) {
                user_status = "success";
            } else {
                user_status = "error";
            }
            console.log(user_status);
            /*
            // 將資料轉成需要的JSON格式
            var response = {
                status: user_status,
                message:"info for user_id1"
                data:{
                    user_id: results[0][0].user_id,
                    user_name: results[0][0].username,
                    nick_name: results[0][0].nick_name,
                    selected_wallet_id:"haven't done",
                    wallets:[
                        "wallet-a":{
                            wallet_id: results[0][0].wallet_id,
                            wallet_name: results[0][0].wallet_name,
                            selected: "True" // true or false, True for now testing
                            records:[
                                {
                                    record_id:"wallet-a-record-1",
                                    wallet_record_tag_id: results[0][0].wallet_record_tag_id,
                                    record_ordinary: results[0][0].record_ordinary,
                                    record_name: results[0][0].record_name,
                                    record_description: results[0][0].description,
                                    record_amount: results[0][0].amount,
                                    record_type: results[0][0].type,
                                    record_date: results[0][0].date,
                                    record_created_time: results[0][0].record_created_time
                                },
                                {
                                    record_id:"wallet-a-record-2",
                                    wallet_record_tag_id: results[0][1].wallet_record_tag_id,
                                    record_ordinary: results[0][1].record_ordinary,
                                    record_name: results[0][1]...
                                    record_description:
                                    record_amount:
                                    record_type:
                                    record_date:
                                    record_created_time:
                                }
                            ]
                        },
                        "wallet-b":{
                            wallet_id:,
                            wallet_name:,
                            selected: // 若selected==false則records為空陣列
                            records:[    
                            ]
                        }
                    ]
                }
            }
            */
            console.log(results);
            db_dealer.close_sql_connection();
            res.send(results);
        }).catch(err => {
            db_dealer.close_sql_connection();
            res.send(err);
        });
});
