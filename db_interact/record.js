import mysql from 'mysql'
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'

dotenv.config();

// 連接mysql連線池
var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});

function print_error(err) {
    console.log("error: " + err.message);
}

const get_record = (record_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * from wallet_record WHERE record_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, record_id, (err, results, fields) => {
                    if(err) reject(err);
                    else {
                        conn.release();
                        resolve(results);
                    }
                });
            }
        });
    });
};

const insert_record = async (record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    return new Promise( async (resolve, reject) => {
        var record_id = "record_" + uuid();
        var sql = "START TRANSACTION; INSERT INTO wallet_record(record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_created_time, record_updated_time) VALUE(?,?,?,?,?,?,?,?,?,NOW(),NOW()); UPDATE wallet SET record_num = record_num + 1 WHERE wallet_id = ?; UPDATE wallet SET wallet_total = wallet_total + ? WHERE wallet_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_wallet_id, record_amount, record_wallet_id], (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve();
                    }
                });
            }
        });
    });
};


const update_record = async (record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_amount_diff) => {
    return new Promise( async (resolve, reject) => {
        var sql = "START TRANSACTION; UPDATE wallet_record SET wallet_record_tag_id = ?, record_ordinary = ?, record_name = ?, record_description = ?, record_amount = ?, record_type = ?, record_date = ?, record_updated_time = NOW() WHERE record_id = ?; UPDATE wallet SET wallet_total = wallet_total + ? WHERE wallet_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_id, record_amount_diff, record_wallet_id], (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve();
                    }
                });
            }
        });
    });
};


const delete_record = async (record_id, record_wallet_id, record_amount) => {
    return new Promise( async (resolve, reject) => {
        // 刪減wallet中的record_num和wallet_total
        var sql = "START TRANSACTION; UPDATE wallet SET record_num = record_num - 1 WHERE wallet_id = ?; UPDATE wallet SET wallet_total = wallet_total - ? WHERE wallet_id = ?; DELETE FROM wallet_record WHERE record_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [record_wallet_id, record_amount, record_wallet_id, record_id], (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve();
                    }
                });
            }
        })
    });
};

export default { get_record, insert_record, update_record, delete_record };
