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

    // 讀取database資料
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
        });
        console.log("res is :");
        console.log(res);
    } catch (e) {
        console.log("ERROR: " + e.message);
        return "ERROR HAPPENED.";

    // 斷開資料庫連線
    connection.end();
    /*
    若在callback function中return就不會return回router
    但直接return又會因為異步執行導致還沒抓到資料就回傳
    */
    return res;
}

exports.get_login = get_login;
