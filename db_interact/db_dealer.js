import mysql from 'mysql'
import dotenv from "dotenv";
import { v4 as uuid } from 'uuid'

dotenv.config();
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});
connection.connect(function(err){
    if(err){
        return err;
    }
    else{
        console.log("Successfully connect to mysql : root@localhost ");
    }
});

// request dealer
const get_user = (id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "SELECT id,username,nickname,wallet_id,wallet_total,wallet_name,selected,record_id,wallet_record_tag_id,record_ordinary,record_name,record_description,record_amount,record_type,record_date,record_created_time,record_updated_time,wallet_num,record_num FROM user JOIN wallet ON wallet.user_id=user.id LEFT JOIN wallet_record ON wallet_record.record_wallet_id=wallet.wallet_id AND record_date BETWEEN date_sub(NOW(),interval 6 MONTH) AND date_add(NOW(),interval 6 MONTH) AND wallet.selected = 1 WHERE user.id = ? ORDER BY CAST(wallet_record.record_wallet_id AS UNSIGNED)";
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

const user_exist = (id) => {
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

const insert_wallet = async (user_id, selected, wallet_name, wallet_total, wallet_title, wallet_description) => {
    var wallet_id = 'wallet_' + uuid.v4();
    var sql = "INSERT INTO wallet VALUE(?,?,?,?,?,?,?,NOW(),NOW(),0)";
    await connection.query(sql, [wallet_id, user_id, selected, wallet_name, wallet_total, wallet_title, wallet_description], (err, results, fields) => {
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
const update_wallet = async (wallet_id, selected, wallet_name, wallet_total, wallet_title, wallet_description) => {
    var sql = "UPDATE wallet SET selected = ?, wallet_name = ?, wallet_total = ?, wallet_title = ?, wallet_description = ?, updated_time = NOW() WHERE wallet_id = ?";
    connection.query(sql, [selected, wallet_name, wallet_total, wallet_title, wallet_description, wallet_id], (err, results, fields) => {
        if(err)
            console.log("db: wallet update error: " + err.message);
        else
            console.log("db: wallet update successfully.");
    })
};

const delete_wallet = async (user_id, wallet_id) => {
    var sql = "DELETE FROM wallet WHERE wallet_id = ?";
    await connection.query(sql, wallet_id, (err, results, fields) => {
        if(err)
            console.log("db: wallet deletion error: " + err.message);
        else
            console.log("db: wallet delete successfully.");
    })
    var sql2 = "UPDATE user SET wallet_num = wallet_num - 1 WHERE id = ?";
    connection.query(sql2, user_id, (err, results, fields) => {
        if(err)
            console.log("db: wallet update user error: " + message);
        else
            console.log("db: wallet update user successfully.");
    })
    // 被刪除的wallet的record與tag都以foreign key on delete cascade一併刪除
};

const insert_record = async (record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    var record_id = "record_" + uuid.v4();
    var sql = "INSERT INTO wallet_record VALUE(?,?,?,?,?,?,?,?,?,NOW(),NOW())";
    await connection.query(sql, [record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date], (err, results, fields) => {
        if(err)
            console.log("db: record insertion error: " + err.message);
        else
            console.log("db: record insert successfully.");
    })
    // update wallet's record_num and wallet_total
    var sql2 = "UPDATE wallet SET record_num = record_num + 1, wallet_total = wallet_total + ? WHERE wallet_id = ?";
    await connection.query(sql2, [record_amount, record_wallet_id], (err, results, fields) => {
        if(err)
            console.log("db: record wallet update error: " + err.message);
        else
            console.log("db: record wallet update successfully.");
    })
};

// record_id, wallet_id不給改
const update_record = async (record_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    var sql = "UPDATE wallet_record SET wallet_record_tag_id = ?, record_ordinary = ?, record_name = ?, record_description = ?, record_amount = ?, record_type = ?, record_date = ?, record_updated_time = NOW() WHERE record_id = ?";
    connection.query(sql, [wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_id], (err, results, fields) => {
        if(err)
            console.log("db: record update error: " + err.message);
        else
            console.log("db: record update successfully.");
    })
};

const delete_record = async (record_id, record_wallet_id, record_amount) => {
    // 刪減wallet中的record_num和wallet_total
    console.log(record_amount);
    var sql2 = "UPDATE wallet SET record_num = record_num - 1, wallet_total = wallet_total - ? WHERE wallet_id = ?";
    await connection.query(sql2, [record_amount, record_wallet_id], (err, results, fields) => {
        if(err)
            console.log("db: record wallet update error: " + err.message);
        else
            console.log("db: record wallet update successfully.");
    })
    // 最後刪除record
    var sql3 = "DELETE FROM wallet_record WHERE record_id = ?";
    await connection.query(sql3, record_id, (err, results, fields) => {
        if(err)
            console.log("db: record deletion error: " + err.message);
        else
            console.log("db: record delete successfully.");
    })
};

const insert_tag = async (wallet_id, tag_ordinary, tag_name, tag_type) => {
    var tag_id = "tag_" + uuid.v4();
    var sql = "INSERT INTO wallet_record_tag_id VALUE(?,?,?,?,?,NOW(),NOW())";
    connection.query(sql, [tag_id, wallet_id, tag_ordinary, tag_name, tag_type], (err, results, fields) => {
        if(err)
            console.log("db: tag insertion error: " + err.message);
        else
            console.log("db: tag inserted successfully.");
    })
};

// tag_id, wallet_id不給改
const update_tag = async (tag_ordinary, tag_name, tag_type) => {
    var sql = "UPDATE wallet_record_tag_id SET tag_ordinary = ?, tag_name = ?, tag_type = ?";
    connection.query(sql, [tag_ordinary, tag_name, tag_type], (err, results, fields) => {
        if(err)
            console.log("db: tag update error: " + err.message);
        else
            console.log("db: tag update successfully.");
    })
};

const delete_tag = async (tag_id) => {
    var sql = "DELETE FROM wallet_record_tag_id WHERE tag_id = ?";
    connection.query(sql, tag_id, (err, results, fields) => {
        if(err)
            console.log("db: tag deletion error: " + err.message);
        else
            console.log("db: tag deleted successfully.");
    })
};

function close_sql_connection () {
    connection.end();
}

const db_dealer = {
    insert_user , update_user, delete_user,
    insert_wallet , update_wallet , delete_wallet,
    insert_record , update_record , delete_record,
    insert_tag , update_tag , delete_tag,
    get_user , get_wallet , user_exist,
    close_sql_connection
}

export default db_dealer;