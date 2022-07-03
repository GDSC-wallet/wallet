import { pool } from "./db_pool.js"
import { v4 as uuid } from 'uuid'

function print_error(err) {
    console.log("error: " + err.message);
}


const get_wallet = (user_id, wallet_id, time_chosen) => {
    return new Promise(async (resolve, reject) => {
        var sql = "START TRANSACTION; SELECT wallet_id,wallet_name,wallet_total,wallet_description,record_num,record_id,wallet_record_tag_id,record_ordinary,record_name,record_description,record_amount,record_type,record_date,record_created_time,record_updated_time FROM wallet LEFT JOIN wallet_record ON wallet_record.record_wallet_id=wallet.wallet_id AND record_date BETWEEN date_sub(? ,interval 6 MONTH) AND date_add(? ,interval 6 MONTH) WHERE wallet_id = ? ORDER BY CAST(wallet_record.record_wallet_id AS UNSIGNED); UPDATE wallet SET selected = 0 WHERE selected = 1 AND user_id = ?; UPDATE wallet SET selected = 1 WHERE wallet_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [time_chosen, time_chosen, wallet_id, user_id, wallet_id], async (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else {
                            conn.release();
                            resolve(results);
                        }
                });
            }
        });
    });
}


// insert wallet不會將新增錢包selected設為1
const insert_wallet = async (user_id, wallet_name, wallet_description) => {
    return new Promise( async (resolve, reject) => {
        var wallet_id = 'wallet_' + uuid();
        var name = ["早餐","午餐","晚餐","飲料","宵夜","交通","日用品","其他","工作","現金","轉帳","其他"];
        var type = ["expense","expense","expense","expense","expense","expense","expense","expense","income","income","income","income"];
        var color = ["#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE"];
        var query_tags = function () {
            var values = [];
            values.push(wallet_id, user_id, 0, wallet_name, 0, wallet_description, user_id);
            for(var i = 0; i < 12; ++i) {
                values.push("tag_" + uuid());
                values.push(wallet_id);
                values.push(i+1);
                values.push(name[i]);
                values.push(type[i]);
                values.push(color[i]);
            }
            return values;
        }
        var value_str = "";
        for(var i = 0; i < 12; ++i) {
            value_str += "(?,?,?,?,?,NOW(),NOW(),?)";
            if(i != 11)
                value_str += ", ";
        }
        var sql = `START TRANSACTION; INSERT INTO wallet(wallet_id, user_id, selected, wallet_name, wallet_total, wallet_description, wallet_created_time, wallet_updated_time, record_num) VALUE(?,?,?,?,?,?,NOW(),NOW(),0); UPDATE user SET wallet_num = wallet_num + 1 WHERE id = ?; INSERT INTO wallet_record_tag_id(tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_created_time, tag_updated_time, tag_color) VALUES ${value_str}; COMMIT;`;
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [].concat(query_tags()), async (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        console.log("wallet inserted successfully.");
                        resolve();
                    }
                });
            }
        });
    });
};


// wallet_id判斷用
const update_wallet = async (wallet_id, wallet_name, wallet_description) => {
    console.log({wallet_id, wallet_name, wallet_description})
    return new Promise( async (resolve, reject) => {
        var sql = "UPDATE wallet SET wallet_name = ?, wallet_description = ?, wallet_updated_time = NOW() WHERE wallet_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [wallet_name, wallet_description, wallet_id], (err, results, fields) => {
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


const delete_wallet = async (user_id, wallet_id) => {
    return new Promise( async (resolve, reject) => {
        // 檢查wallet如果剩一個就不能刪除
        var sql = "SELECT user_id FROM wallet WHERE user_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [user_id], async (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else if (results.length == 1) {
                        reject(new Error("wallet至少要有一個"));
                       } else {
                        sql = "START TRANSACTION; DELETE FROM wallet WHERE wallet_id = ?; UPDATE user SET `wallet_num` = ( CASE WHEN `wallet_num` < 1 THEN 0 ELSE (`wallet_num` - 1) end) WHERE id = ?; UPDATE wallet SET selected = 1 WHERE selected = 0 AND user_id = ? ORDER BY wallet_updated_time DESC LIMIT 1; COMMIT";
                        await conn.query(sql, [wallet_id, user_id, user_id], (err, results, fields) => {
                            if(err) {
                                print_error(err);
                                reject(err);
                            } else {
                                conn.release();
                                resolve();
                            }
                        })
                    }
                });
            }
        });
    });
    // 被刪除的wallet的record與tag都以foreign key on delete cascade一併刪除
};

export default {  get_wallet, insert_wallet, update_wallet, delete_wallet };
