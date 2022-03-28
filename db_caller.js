const db_dealer = require('./db_dealer.js')
const express = require('express')
const app = express()
const port = 3000


// 問資料庫user是否存在
function authenticate (id) {
    db_dealer.user_exist(id)
        .then(results => {
            console.log("authentication says:")
            console.log(results);
            console.log(results.length);
            if(results.length == 0) {
                console.log("return false");
                return false;
            } else {
                console.log("return true");
                return true;
            }
        }).catch(err => {
            console.log("ERROR: " + err.message);
            return false;
        });
}

exports.authenticate = authenticate;
