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
const get_user = (id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "SELECT id,username,nickname,wallet_id,wallet_title,wallet_total,wallet_name,wallet_description,selected,record_id,wallet_record_tag_id,record_ordinary,record_name,record_description,record_amount,record_type,record_date,record_created_time,record_updated_time,wallet_num,record_num FROM user JOIN wallet ON wallet.user_id=user.id LEFT JOIN wallet_record ON wallet_record.record_wallet_id=wallet.wallet_id AND record_date BETWEEN date_sub(NOW(),interval 6 MONTH) AND date_add(NOW(),interval 6 MONTH) AND wallet.selected = 1 WHERE user.id = ? ORDER BY CAST(wallet_record.record_wallet_id AS UNSIGNED)";
        connection.query(sql, id, async (err, results, fields) => {
            if(err) reject(err);
            else {
                resolve(results);
            }
        });
    });
}

const get_wallet = (wallet_id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT wallet_id,wallet_name,wallet_total,wallet_title,wallet_description,record_num,record_id,wallet_record_tag_id,record_ordinary,record_name,record_description,record_amount,record_type,record_date,record_created_time,record_updated_time FROM wallet LEFT JOIN wallet_record ON wallet_record.record_wallet_id=wallet.wallet_id AND record_date BETWEEN date_sub(NOW(),interval 6 MONTH) AND date_add(NOW(),interval 6 MONTH) WHERE wallet_id = ? ORDER BY CAST(wallet_record.record_wallet_id AS UNSIGNED)";
        connection.query(sql, wallet_id, (err, results, fields) => {
            if(err) reject(err);
            else {
                resolve(results);
            }
        });
    });
}


const get_record = (record_id) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * from wallet_record WHERE record_id = ?";
        connection.query(sql, record_id, (err, results, fields) => {
            if(err) reject(err);
            else
                resolve(results);
        });
    });
};

const user_exist = async (id) => {
    var sql = "SELECT * FROM user WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, id, (err, results, fields) => {
            if(err) reject(err);
            else resolve(results);
        });
    });
};

/************** INSERT, UPDATE and DELETE database function *******************/

const insert_user = async (channel, channel_id, email, username, nickname) => {
    // generate uuid for the user
    var id = 'user_' + uuid.v4();
    var sql = "INSERT INTO user VALUE(?,?,?,?,?,?,NOW(),NOW(),0)";
    connection.query(sql, [id, channel, channel_id, email, username, nickname], (err, results, fields) => {
        if(err)
            console.log("db: user insertion error: " + err.message);
        else
            console.log("db: user insert successfully.");
    });
    // 預設給user一個wallet
    await insert_wallet(id, 1, 'preset_wallet',0,'preset_wallet','This is a preset_wallet for user');
};

// id判斷用,channel,channel_id不給改
const update_user = async (id, email, username, nickname, created_time) => {
    var sql = "UPDATE user SET email = ?, username = ?, nickname = ?, created_time = ?, updated_time = NOW() WHERE id = ?";
    connection.query(sql, [email, username, nickname, created_time], id, (err, results, fields) => {
        if(err)
            console.log("db: user update error: " + err.message);
        else
            console.log("db: user update successfully.");
    });
};

const delete_user = async (id) => {
    var sql = "DELETE FROM user WHERE id = ?";
    connection.query(sql, id, (err, results, fields) => {
        if(err)
            console.log("db: user deletion error: " + err.message);
        else
            console.log("db: user deleted successfully.");
    });
    // user有的wallet以foreign key on delete cascade一併刪除
};

const insert_wallet = async (user_id, wallet_name, wallet_title, wallet_description) => {
    return new Promise( async (resolve, reject) => {
        var wallet_id = 'wallet_' + uuid();
        var sql = "START TRANSACTION; INSERT INTO wallet VALUE(?,?,?,?,?,?,?,NOW(),NOW(),0); UPDATE user SET wallet_num = wallet_num + 1 WHERE id = ?; UPDATE wallet SET selected = 0 WHERE selected = 1; UPDATE wallet SET selected = 1 WHERE wallet_id = ?; COMMIT";
        await connection.query(sql, [wallet_id, user_id, 0, wallet_name, 0, wallet_title, wallet_description, user_id, wallet_id], (err, results, fields) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// wallet_id判斷用
const update_wallet = async (wallet_id, wallet_name, wallet_title, wallet_description) => {
    return new Promise( async (resolve, reject) => {
        var sql = "UPDATE wallet SET wallet_name = ?, wallet_title = ?, wallet_description = ?, updated_time = NOW() WHERE wallet_id = ?";
        await connection.query(sql, [wallet_name, wallet_title, wallet_description, wallet_id], (err, results, fields) => {
            if(err) {
                console.log("error: " + err.message);
                reject(err);
            } else { 
                resolve();
            }
        });
    });
};

const delete_wallet = async (user_id, wallet_id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "START TRANSACTION; DELETE FROM wallet WHERE wallet_id = ?; UPDATE user SET wallet_num = wallet_num - 1 WHERE id = ?; COMMIT";
        await connection.query(sql, [wallet_id, user_id], (err, results, fields) => {
            if(err) {
                console.log("error: " + err.message);
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
        var record_id = "record_" + uuid.v4();
        var sql = "START TRANSACTION; INSERT INTO wallet_record VALUE(?,?,?,?,?,?,?,?,?,NOW(),NOW()); UPDATE wallet SET record_num = record_num + 1, wallet_total = wallet_total + ? WHERE wallet_id = ?; COMMIT";
        await connection.query(sql, [record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_amount, record_wallet_id], (err, results, fields) => {
            if(err) {
                console.log("error: " + err.message);
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
                console.log("error: " + err.message);
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
                console.log("error: " + err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const insert_tag = async (tag_wallet_id, tag_ordinary, tag_name, tag_type) => {
    var tag_id = "tag_" + uuid.v4();
    var sql = "INSERT INTO wallet_record_tag_id VALUE(?,?,?,?,?,NOW(),NOW())";
    await connection.query(sql, [tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type], (err, results, fields) => {
        if(err)
            console.log("db: tag insertion error: " + err.message);
        else
            console.log("db: tag inserted successfully.");
    })
};

// tag_id, wallet_id不給改
const update_tag = async (tag_ordinary, tag_name, tag_type) => {
    var sql = "UPDATE wallet_record_tag_id SET tag_ordinary = ?, tag_name = ?, tag_type = ?";
    await connection.query(sql, [tag_ordinary, tag_name, tag_type], (err, results, fields) => {
        if(err)
            console.log("db: tag update error: " + err.message);
        else
            console.log("db: tag update successfully.");
    })
};

const delete_tag = async (tag_id) => {
    var sql = "DELETE FROM wallet_record_tag_id WHERE tag_id = ?";
    await connection.query(sql, tag_id, (err, results, fields) => {
        if(err)
            console.log("db: tag deletion error: " + err.message);
        else
            console.log("db: tag deleted successfully.");
    })
};

const close_sql_connection = ()=> {
    connection.end();
}

const db_dealer = {
    insert_user, update_user, delete_user,
    insert_wallet, update_wallet, delete_wallet,
    insert_tag, update_tag, delete_tag,
    get_user, get_wallet, user_exist, get_record,
    close_sql_connection
}

export default db_dealer;
