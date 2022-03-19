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
    connection.connect();

    var sql = "SELECT * FROM user JOIN wallet ON wallet.user_id=user.id JOIN wallet_record ON wallet_record.wallet_id=wallet.id";
    try{
        connection.query(sql, function(err, results, fields){
            if(error) {
                throw err;
            }
            console.log(results);
    } catch (e) {
        console.log("ERROR: " + e.message);
    }
})

exports.get_login = get_login;
