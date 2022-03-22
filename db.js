const express = require('express');
const mysql = require('mysql');
const app = express();


function get_login() {
    // 連線到mysql
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '620109roy',
        port: 3306,
        database: 'GDSC_wallet'
    });

    connection.connect(function(err){
        if(err)
            return "Connect to mysql failed.";
        else
            console.log("Successfully connect to mysql : root@localhost ");
    });

    var sql = "SELECT * FROM user JOIN wallet ON wallet.user_id=user.id JOIN wallet_record ON wallet_record.wallet_id=wallet.wallet_id";
    try{
        //var temp = {};
        var res = [];
        connection.query(sql, function(err, result, fields) {
            if(err) {
                throw err;
            }
            console.log("Selected " + result.length + " row(s).");
            for(let i=0; i<result.length; ++i) {
                res.push(JSON.stringify(result[i]));
            }
            // 回傳的json格式
            /*
            result.forEach(function(result, idx){
                var response:
                {
                    status:"error"/"success"
                    message:"info for user_id1"
                    data:{
                        user_id: result.user_id,
                        selected_wallet_id:"a",
                        wallets:[
                            "wallet-a":{
                                wallet_id: result.wallet_id,
                                wallet_name: result.username,
                                selected: "True" // true or false, True for now testing
                                records:[
                                    {
                                        record_id:"wallet-a-record-1",
                                        wallet_record_tag_id: result.wallet_record_tag_id,
                                        record_ordinary: result.ordinary,
                                        record_name: result.record_name,
                                        record_description: result.description,
                                        record_amount: result.amount,
                                        record_type: result.type,
                                        record_date: result.date,
                                        record_created_time: result.record_created_time
                                    },
                                    {
                                        record_id:"wallet-a-record-2",
                                        wallet_record_tag_id:
                                        record_ordinary:
                                        record_name:
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
                return 
            });
            */

            console.log("res is :");
            console.log(res);
        });
    } catch (e) {
        console.log("ERROR__: " + e.message);
        return "Error happened."
    }
    // 斷開資料庫連線
    connection.end();
    // 太早回傳導致res還沒有抓到東西就回傳,改用promise
    return res;
}

exports.get_login = get_login;
