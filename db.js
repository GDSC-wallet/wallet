const express = require('express');
const mysql = require('mysql');
const app = express();


var sql = "SELECT * FROM user JOIN wallet ON wallet.user_id=user.id JOIN wallet_record ON wallet_record.wallet_id=wallet.wallet_id";
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234567',
    port: 3306,
    database: 'GDSC_wallet'
});
connection.connect(function(err){
    if(err)
        return "Connection to mysql failed.";
    else
        console.log("Successfully connect to mysql : root@localhost ");
});


// request dealer
const get_wallet = () => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};

function close_sql_connection() {
    connection.end();
}

exports.get_wallet = get_wallet;
exports.close_sql_connection = close_sql_connection;
