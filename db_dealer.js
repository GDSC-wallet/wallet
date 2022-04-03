const express = require('express')
const mysql = require('mysql')
const uuid = require('uuid')
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
        return err;
    else
        console.log("Successfully connect to mysql : root@localhost ");
});


// request dealer
const get_user = (id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM user JOIN wallet ON wallet.user_id=user.id JOIN wallet_record ON wallet_record.wallet_id=wallet.wallet_id WHERE user.id = ? ORDER BY CAST(wallet_record.wallet_id AS UNSIGNED)";   //  判斷+-6個月未做
        connection.query(sql, id, (err, results, fields) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
}

const user_exist = (id) => {
    var sql = "SELECT * FROM user WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, id, (err, results, fields) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};

/***********************************************
 *                                             *
 * insert, update and delete database function *
 *                                             *
 ************************************************/

const insert_user = (channel, channel_id, email, username, nickname) => {
    // generate uuid for the user
    var id = 'user_' + uuid.v4();
    var sql = "INSERT INTO user VALUE(?,?,?,?,?,?,NOW(),NOW(),1)";
    connection.query(sql, [id, channel, channel_id, email, username, nickname], (err, results, fields) => {
        if(err)
            console.log("db: user insertion error: " + err.message);
        else
            console.log("db: user insert successfully.");
    });
};

// id判斷用,channel,channel_id不給改
const update_user = (id, email, username, nickname, created_time) => {
    var sql = "UPDATE user SET email = ? username = ? nickname = ? created_time = ? updated_time = NOW() WHERE id = ?";
    connection.query(sql, [email, username, nickname, created_time], id, (err, results, fields) => {
        if(err)
            console.log("db: user update error: " + err.message);
        else
            console.log("db: user update successfully.");
    });
};

const delete_user = (id) => {
    var sql = "DELETE FROM user WHERE id = ?";
    connection.query(sql, id, (err, results, fields) => {
        if(err)
            console.log("db: user deletion error: " + err.message);
        else
            console.log("db: user deleted successfully.");
    });
};

const insert_wallet = (user_id, selected, wallet_name, wallet_total, wallet_title, wallet_description) => {
    var wallet_id = 'wallet_' + uuid.v4();
    var sql = "INSERT INTO wallet VALUE(?,?,?,?,?,?,?,NOW(),NOW(),0)";
    connection.query(sql, [wallet_id, user_id, selected, wallet_name, wallet_total, wallet_title, wallet_description], (err, results, fields) => {
        if(err)
            console.log("db: wallet insertion error: " + err.message);
        else
            console.log("db: wallet insert successfully.");
    });
    // user.wallet_num increment
    var sql2 = "UPDATE user SET wallet_num = wallet_num + 1 WHERE id = ?";
    connection.query(sql2, user_id, (err, results, fields) => {
        if(err)
            console.log("db: user update error: " + err.message);
        else
            console.log("db: user updated successfully.");
    });
};

// wallet_id, user_id不給改, wallet_id判斷用
const update_wallet = (wallet_id, selected, wallet_name, wallet_total, wallet_title, wallet_description) => {
    var sql = "UPDATE wallet SET selected = ? wallet_name = ? wallet_total = ? wallet_title = ? wallet_description = ? updated_time = NOW() WHERE wallet_id = ?";
    connection.query(sql, [selected, wallet_name, wallet_total, wallet_title, wallet_description, wallet_id], (err, results, fields) => {
        if(err)
            console.log("db: wallet update error: " + err.message);
        else
            console.log("db: wallet update successfully.");
    })
};

const delete_wallet = (wallet_id) => {
    var sql = "DELETE FROM wallet WHERE wallet_id = ?";
    connection.query(sql, wallet_id, (err, results, fields) => {
        if(err)
            console.log("db: wallet deletion error: " + err.message);
        else
            console.log("db: wallet delete successfully.");
    })
    var sql2 = "UPDATE user SET wallet_num = wallet_num - 1 WHERE id = ?";
    connection.query(sql2, wallet_id, (err, results, fields) => {
        if(err)
            console.log("db: wallet update user error: " + message);
        else
            console.log("db: wallet update user successfully.");
    })
};

const insert_record = () => {
    
    // update wallet's record_num
};

const update_record = () => {

};

const delete_record = () => {

};

const insert_tag = () => {

};

const update_tag = () => {

};

const delete_tag = () => {

};

function close_sql_connection () {
    connection.end();
}

exports.insert_user = insert_user;
exports.update_user = update_user;
exports.delete_user = delete_user;
exports.insert_wallet = insert_wallet;
exports.update_wallet = update_wallet;
exports.delete_wallet = delete_wallet;
exports.insert_record = insert_record;
exports.update_record = update_record;
exports.delete_record = delete_record;
exports.insert_tag = insert_tag;
exports.update_tag = update_tag;
exports.delete_tag = delete_tag;
exports.get_user = get_user;
exports.user_exist = user_exist;
exports.close_sql_connection = close_sql_connection;
