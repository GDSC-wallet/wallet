import mysql from 'mysql'
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'

dotenv.config();
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});

connection.connect(function(err){
    if(err)
        return err;
    else
        console.log("Successfully connect to mysql : root@localhost ");
});

function print_error(err) {
    console.log("error: " + err.message);
}

// request dealer
const get_user = (id, time_chosen) => {
    return new Promise( async (resolve, reject) => {
        var sql = "SELECT id,username,nickname,wallet_id,wallet_title,wallet_total,wallet_name,wallet_description,selected,record_id,wallet_record_tag_id,record_ordinary,record_name,record_description,record_amount,record_type,record_date,record_created_time,record_updated_time,wallet_num,record_num FROM user JOIN wallet ON wallet.user_id=user.id LEFT JOIN wallet_record ON wallet_record.record_wallet_id=wallet.wallet_id AND record_date BETWEEN date_sub(?,interval 6 MONTH) AND date_add(?,interval 6 MONTH) AND wallet.selected = 1 WHERE user.id = ? ORDER BY CAST(wallet_record.record_wallet_id AS UNSIGNED)";
        await connection.query(sql, [time_chosen, time_chosen, id], async (err, results, fields) => {
            if(err) reject(err);
            else {
                resolve(results);
            }
        });
    });
}

const get_wallet = (user_id, wallet_id, time_chosen) => {
    return new Promise(async (resolve, reject) => {
        var sql = "START TRANSACTION; SELECT wallet_id,wallet_name,wallet_total,wallet_title,wallet_description,record_num,record_id,wallet_record_tag_id,record_ordinary,record_name,record_description,record_amount,record_type,record_date,record_created_time,record_updated_time FROM wallet LEFT JOIN wallet_record ON wallet_record.record_wallet_id=wallet.wallet_id AND record_date BETWEEN date_sub(? ,interval 6 MONTH) AND date_add(? ,interval 6 MONTH) WHERE wallet_id = ? ORDER BY CAST(wallet_record.record_wallet_id AS UNSIGNED)";
        await connection.query(sql, [time_chosen, time_chosen, wallet_id], async (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            }
            else {
                // get wallet的同時改變selected
                var sql2 = "UPDATE wallet SET selected = 0 WHERE selected = 1 AND user_id = ?; UPDATE wallet SET selected = 1 WHERE wallet_id = ?; COMMIT";
                await connection.query(sql2, [user_id, wallet_id], (err, result, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        //console.log(results)i;
                        resolve(results);
                    }
                });
            }
        });
    });
}


const get_record = (record_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * from wallet_record WHERE record_id = ?";
        await connection.query(sql, record_id, (err, results, fields) => {
            if(err) reject(err);
            else
                resolve(results);
        });
    });
};

const get_wallet_tag = (wallet_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * from wallet_record_tag_id WHERE tag_wallet_id = ?";
        connection.query(sql, wallet_id, (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

const get_tag = (tag_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * from wallet_record_tag_id WHERE tag_id = ?";
        connection.query(sql, tag_id, (err, results, fields) => {
            if(err) reject(err);
            else
                resolve(results);
        });
    });
};

const user_exist = async (id) => {
    console.log('id :', id);
    var sql = "SELECT * FROM user WHERE id = ?";
    return new Promise( async (resolve, reject) => {
        await connection.query(sql, id, (err, results, fields) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};

/************** INSERT, UPDATE and DELETE database function *******************/

const insert_user = async (id, channel, channel_id, email, username, nickname) => {
    return new Promise( async (resolve, reject) => {
        console.log("id: " + id);
        console.log("channel: " + channel);
        console.log("channel_id: " + channel_id);
        console.log("email: " + email);
        console.log("username: " + username);
        console.log("nickname: " + nickname);
        if(nickname == undefined)
            nickname = "null"
        // generate uuid for the user
        var sql = "START TRANSACTION; INSERT INTO user(id,channel,channel_id,email,username,nickname,created_time,updated_time,wallet_num) VALUE(?,?,?,?,?,?,NOW(),NOW(),0)";
        await connection.query(sql, [id, channel, channel_id, email, username, nickname], async (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            }
            else {
                // 預設給user一個wallet
                // 不能用call函式的寫法因為會包不到transaction
                // 預設的錢包selected設為1
                var wallet_id = "wallet_" + uuid();
                const wallet_name = "preset_wallet";
                const wallet_title = "預設錢包";
                const wallet_description = "這是預設錢包";
                var sql2 = "INSERT INTO wallet(wallet_id, user_id, selected, wallet_name, wallet_total, wallet_title, wallet_description, wallet_created_time, wallet_updated_time, record_num) VALUE(?,?,?,?,?,?,?,NOW(),NOW(),0); UPDATE user SET wallet_num = wallet_num + 1 WHERE id = ?";
                await connection.query(sql2, [wallet_id, id, 1, wallet_name, 0, wallet_title, wallet_description, id], async (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else {
                        // 暫時將ordinary都設為1~12,並將預設顏色都設為#BEBEBE(灰)
                        var name = ["早餐","午餐","晚餐","飲料","宵夜","交通","日用品","其他","工作","現金","轉帳","其他"];
                        var type = ["支出","支出","支出","支出","支出","支出","支出","支出","收入","收入","收入","收入"];
                        var color = ["#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE"];
                        for(var i = 0; i < 12; ++i) {
                            var tag_id = "tag_" + uuid();
                            sql = "INSERT INTO wallet_record_tag_id(tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_created_time, tag_updated_time, tag_color) VALUE(?,?,?,?,?,NOW(),NOW(),?)";
                            await connection.query(sql, [tag_id, wallet_id, i+1, name[i], type[i], color[i]], (err, results, fields) => {
                                if(err) {
                                    print_error(err);
                                    reject(err);
                                }
                            });
                            if(i == 11) {
                                await connection.query("COMMIT", (err, results, fields) => {
                                    if(err) {
                                        print_error(err);
                                        reject(err);
                                    }
                                })
                            }
                        }
                    }
                });
                console.log("user, default wallet and default tags inserted successfully.");
                resolve();
            }
        });
    });
};

// id判斷用,channel,channel_id不給改
const update_user = async (id, email, username, nickname, created_time) => {
    return new Promise( async(resolve, reject) => {
        var sql = "UPDATE user SET email = ?, username = ?, nickname = ?, created_time = ?, updated_time = NOW() WHERE id = ?";
        await connection.query(sql, [email, username, nickname, created_time], id, (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            }
            else 
                resolve();
        });
    });
};

const delete_user = async (id) => {
    return new Promise( async(resolve, reject) => {
        var sql = "DELETE FROM user WHERE id = ?";
        await connection.query(sql, id, (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            }
            else
                resolve();
        });
    });
    // user有的wallet以foreign key on delete cascade一併刪除
};

// insert wallet不會將新增錢包selected設為1
const insert_wallet = async (user_id, wallet_name, wallet_title, wallet_description) => {
    return new Promise( async (resolve, reject) => {
        var wallet_id = 'wallet_' + uuid();
        var sql = "START TRANSACTION; INSERT INTO wallet(wallet_id, user_id, selected, wallet_name, wallet_total, wallet_title, wallet_description, wallet_created_time, wallet_updated_time, record_num) VALUE(?,?,?,?,?,?,?,NOW(),NOW(),0); UPDATE user SET wallet_num = wallet_num + 1 WHERE id = ?";
        await connection.query(sql, [wallet_id, user_id, 0, wallet_name, 0, wallet_title, wallet_description, user_id], async (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                // 暫時將ordinary都設為1~12,並將預設顏色都設為#BEBEBE(灰)
                var name = ["早餐","午餐","晚餐","飲料","宵夜","交通","日用品","其他","工作","現金","轉帳","其他"];
                var type = ["支出","支出","支出","支出","支出","支出","支出","支出","收入","收入","收入","收入"];
                var color = ["#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE","#BEBEBE"];
                for(var i = 0; i < 12; ++i) {
                    var tag_id = "tag_" + uuid();
                    sql = "INSERT INTO wallet_record_tag_id(tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_created_time, tag_updated_time, tag_color) VALUE(?,?,?,?,?,NOW(),NOW(),?)";
                    await connection.query(sql, [tag_id, wallet_id, i+1, name[i], type[i], color[i]], (err, results, fields) => {
                        if(err) {
                            print_error(err);
                            reject(err);
                        }
                    });
                    if(i == 11) {
                        await connection.query("COMMIT", (err, results, fields) => {
                            if(err) {
                                print_error(err);
                                reject(err);
                            } else
                                resolve();
                        })
                    }
                }
            }
        });
    });
};

// wallet_id判斷用
const update_wallet = async (wallet_id, wallet_name, wallet_title, wallet_description) => {
    console.log({wallet_id, wallet_name, wallet_title, wallet_description})
    return new Promise( async (resolve, reject) => {
        var sql = "UPDATE wallet SET wallet_name = ?, wallet_title = ?, wallet_description = ?, wallet_updated_time = NOW() WHERE wallet_id = ?";
        await connection.query(sql, [wallet_name, wallet_title, wallet_description, wallet_id], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else { 
                resolve();
            }
        });
    });
};

const delete_wallet = async (user_id, wallet_id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "START TRANSACTION; DELETE FROM wallet WHERE wallet_id = ?; UPDATE user SET `wallet_num` = ( CASE WHEN `wallet_num` < 1 THEN 0 ELSE (`wallet_num` - 1) end) WHERE id = ?; COMMIT";
        await connection.query(sql, [wallet_id, user_id], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
    // 被刪除的wallet的record與tag都以foreign key on delete cascade一併刪除
};

// sql error
const insert_record = async (record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    return new Promise( async (resolve, reject) => {
        var record_id = "record_" + uuid();
        var sql = "START TRANSACTION; INSERT INTO wallet_record(record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_created_time, record_updated_time) VALUE(?,?,?,?,?,?,?,?,?,NOW(),NOW()); UPDATE wallet SET record_num = record_num + 1 WHERE wallet_id = ?; UPDATE wallet SET wallet_total = wallet_total + ? WHERE wallet_id = ?; COMMIT";
        await connection.query(sql, [record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_wallet_id, record_amount, record_wallet_id], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// record_id, wallet_id不給改
const update_record = async (record_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    return new Promise( async (resolve, reject) => {
        var sql = "UPDATE wallet_record SET wallet_record_tag_id = ?, record_ordinary = ?, record_name = ?, record_description = ?, record_amount = ?, record_type = ?, record_date = ?, record_updated_time = NOW() WHERE record_id = ?";
        await connection.query(sql, [wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_id], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const delete_record = async (record_id, record_wallet_id, record_amount) => {
    return new Promise( async (resolve, reject) => {
        // 刪減wallet中的record_num和wallet_total
        var sql = "START TRANSACTION; UPDATE wallet SET record_num = record_num - 1, wallet_total = wallet_total - ? WHERE wallet_id = ?; DELETE FROM wallet_record WHERE record_id = ?; COMMIT";
        await connection.query(sql, [record_amount, record_wallet_id, record_id], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const insert_tag = async (tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_color) => {
    return new Promise( async (resolve, reject) => {
        var tag_id = "tag_" + uuid();
        var sql = "INSERT INTO wallet_record_tag_id(tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_created_time, tag_updated_time, tag_color) VALUE(?,?,?,?,?,NOW(),NOW(),?)";
        await connection.query(sql, [tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_color], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else
                resolve();
        })
    });
};

// tag_id, wallet_id不給改
const update_tag = async (tag_ordinary, tag_name, tag_type, tag_color) => {
    return new Promise( async (resolve, reject) => {
        var sql = "UPDATE wallet_record_tag_id SET tag_ordinary = ?, tag_name = ?, tag_type = ?, tag_color = ?";
        await connection.query(sql, [tag_ordinary, tag_name, tag_type, tag_color], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            }
            else
                resolve();
        })
    });
};

const delete_tag = async (tag_id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "DELETE FROM wallet_record_tag_id WHERE tag_id = ?";
        await connection.query(sql, tag_id, (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            }
            else
                resolve();
        })
    });
};

const close_sql_connection = ()=> {
    connection.end();
}

const db_dealer = {
    insert_user, update_user, delete_user,
    insert_wallet, update_wallet, delete_wallet,
    insert_record, update_record, delete_record,
    insert_tag, update_tag, delete_tag,
    get_user, get_wallet, user_exist, get_record, get_tag, get_wallet_tag,
    close_sql_connection
}

export default db_dealer;
