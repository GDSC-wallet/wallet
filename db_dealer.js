const express = require('express')
const mysql = require('mysql')
const app = express();


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '620109roy',
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
    console.log("entry get_wallet function.");
    var sql = "SELECT * FROM user JOIN wallet ON wallet.user_id=user.id JOIN wallet_record ON wallet_record.wallet_id=wallet.wallet_id";
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};

const user_exist = (id) => {
    var sql = "SELECT * FROM user WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, id, (err, results, fields) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};

function close_sql_connection () {
    connection.end();
}


exports.get_wallet = get_wallet;
exports.user_exist = user_exist;
exports.close_sql_connection = close_sql_connection;

