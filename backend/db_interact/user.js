import { pool } from "./db_pool.js"
import { v4 as uuid } from 'uuid'

function print_error(err) {
    console.log("error: " + err.message);
}


// request dealer
const get_user = (id, time_chosen) => {
    return new Promise( async (resolve, reject) => {
        var sql = "SELECT id,username,nickname,barcode,wallet_id,wallet_total,wallet_name,wallet_description,wallet_barcode,selected,record_id,wallet_record_tag_id,record_ordinary,record_name,record_description,record_amount,record_type,record_date,record_created_time,record_updated_time,wallet_num,record_num FROM user JOIN wallet ON wallet.user_id=user.id LEFT JOIN wallet_record ON wallet_record.record_wallet_id=wallet.wallet_id AND record_date BETWEEN date_sub(?,interval 6 MONTH) AND date_add(?,interval 6 MONTH) AND wallet.selected = 1 WHERE user.id = ? ORDER BY CAST(wallet_record.record_wallet_id AS UNSIGNED)";
        // 連線池向資料庫要求連線
        pool.getConnection(async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [time_chosen, time_chosen, id], (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            }
        })
    });
}


const get_wallet_tag = (wallet_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * from wallet_record_tag_id WHERE tag_wallet_id = ? ORDER BY tag_ordinary ASC";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, wallet_id, (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            }
        })
    })
}


const user_exist = async (id) => {
    console.log('id :', id);
    var sql = "SELECT * FROM user WHERE id = ?";
    return new Promise( async (resolve, reject) => {
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, id, (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else { 
                        resolve(results);
                    }
                });
            }
        })
    });
};


const insert_user = async (id, channel, channel_id, email, username, nickname, barcode) => {
    return new Promise( async (resolve, reject) => {
        /*
        console.log("id: " + id);
        console.log("channel: " + channel);
        console.log("channel_id: " + channel_id);
        console.log("email: " + email);
        console.log("username: " + username);
        console.log("nickname: " + nickname);
        */
        if(nickname == undefined)
            nickname = "null";
        // generate uuid for the use
        var wallet_id = "wallet_" + uuid();
        const wallet_name = "錢包1";
        const wallet_description = "預設錢包";
        var name = ["早餐","午餐","晚餐","飲料","宵夜","交通","日用品","其他","工作","現金","轉帳","其他"];
        var type = ["expense","expense","expense","expense","expense","expense","expense","expense","income","income","income","income"];
        var color = ["#E6746A","#E98770","#EEA26E","#EAAE50","#C0CB28","#A6CE83","#61B98B","#5CBDB9","#5C7FB3","#525D9A","#79629C","#B173A3"];
        var query_tags = function () {
            var values = [];
            values.push(id, channel, channel_id, pool.escape(email), username, pool.escape(nickname), pool.escape(barcode), wallet_id, id, 1, pool.escape(wallet_name), 0, pool.escape(wallet_description));
            for(var i = 0; i < 12; ++i) {
                if(i === 7) {
                    values.push("tag_expense_" + wallet_id)
                } else if(i === 11) {
                    values.push("tag_income_" + wallet_id);
                } else {
                    values.push("tag_" + uuid());
                }
                values.push(wallet_id);
                values.push(i+1);
                values.push(pool.escape(name[i]));
                values.push(type[i]);
                values.push(color[i]);
            }
            console.log(values);
            return values;
        }
        var value_str = "";
        for(var i = 0; i < 12; ++i) {
            value_str += "(?,?,?,?,?,NOW(),NOW(),?)";
            if(i != 11)
                value_str += ", ";
        }
        var sql = `START TRANSACTION; INSERT INTO user(id,channel,channel_id,email,username,nickname,barcode,created_time,updated_time,wallet_num,elec_invoice_agree) VALUE(?,?,?,?,?,?,?,NOW(),NOW(),1,false); INSERT INTO wallet(wallet_id, user_id, selected, wallet_name, wallet_total, wallet_description, wallet_created_time, wallet_updated_time, record_num) VALUE(?,?,?,?,?,?,NOW(),NOW(),0); INSERT INTO wallet_record_tag_id(tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_created_time, tag_updated_time, tag_color) VALUES ${value_str}; COMMIT`;
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [].concat(...query_tags()), async (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
};


// id判斷用,channel,channel_id不給改
const update_user = async (id, nickname, barcode, elec_invoice_agree) => {
    return new Promise( async(resolve, reject) => {
        var sql = "";
        if(elec_invoice_agree)
            sql = "UPDATE user SET nickname = ?, barcode = ?, updated_time = NOW(), elec_invoice_agree = true, elec_invoice_agree_time = NOW() WHERE id = ?";
        else
            sql = "UPDATE user SET nickname = ?, barcode = ?, updated_time = NOW(), elec_invoice_agree = false, elec_invoice_agree_time = NULL WHERE id = ?"
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [conn.escape(nickname), conn.escape(barcode), id], (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        })
    });
};


const delete_user = async (id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "DELETE FROM user WHERE id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, id, (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
    // user有的wallet以foreign key on delete cascade一併刪除
};

export default { get_user, get_wallet_tag, user_exist, insert_user, update_user, delete_user };
