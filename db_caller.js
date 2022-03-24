const db_dealer = require('./db_dealer.js')
const express = require('express')
const app = express()
const port = 3000


// 問資料庫user是否存在
function authenticate (id) {
    db_dealer.user_exist(id)
    .then(results => {
        console.log(results);
        if(results.length == 0) {
            return false;
        } else {
            return false;
        }
    }).catch(err => {
        return err;
    });
}

// 登入成功回傳該user資料
function get_login() {
    var sql_data = db_dealer.get_wallet();
    var arr_data = [];
    db_dealer.get_wallet()
    .then(results => {
        for(let i=0; i<results.length; ++i){
            arr_data.push(JSON.stringify(results[i]));
        }
        console.log(arr_data);
        db_dealer.close_sql_connection();
        return arr_data;
    }).catch(err => {
        db_dealer.close_sql_connection();
        return err;
    });
};


exports.get_login = get_login;
exports.authenticate = authenticate;


