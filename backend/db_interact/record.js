import { pool } from "./db_pool.js"
import { v4 as uuid } from 'uuid'

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
                    conn.release();
                    if(err) reject(err);
                    else {
                        resolve(results);
                    }
                });
            }
        });
    });
};

const get_month_records = (wallet_id, time_choosen) => {
    return new Promise( async (resolve, reject) => {
        var sql = "SELECT * FROM wallet_record WHERE YEAR(record_date) = YEAR(?) AND MONTH(record_date) = MONTH(?) AND record_wallet_id = ?"
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [time_choosen, time_choosen, wallet_id], (err, results, fields) => {
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

const insert_record = async (record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    return new Promise( async (resolve, reject) => {
        var sql = "START TRANSACTION; INSERT INTO wallet_record(record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_created_time, record_updated_time) VALUE(?,?,?,?,?,?,?,?,?,NOW(),NOW()); UPDATE wallet SET record_num = record_num + 1 WHERE wallet_id = ?; UPDATE wallet SET wallet_total = wallet_total + ? WHERE wallet_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, conn.escape(record_name), conn.escape(record_description), record_amount, record_type, record_date, record_wallet_id, record_amount, record_wallet_id], (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
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
                await conn.query(sql, [wallet_record_tag_id, record_ordinary, conn.escape(record_name), conn.escape(record_description), record_amount, record_type, record_date, record_id, record_amount_diff, record_wallet_id], (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
};


const batch_record = async (records) => {

    let total_amount = 0;

    const query_records = records.map((record)=>{
        total_amount += record.record_amount;
        return(
            [
                record.record_id,
                record.record_wallet_id,
                record.wallet_record_tag_id,
                record.record_ordinary,
                pool.escape(record.record_name),
                pool.escape(record.record_description),
                record.record_amount,
                record.record_type,
                record.record_date
            ]
        )
    });

    let query_wallets = [query_records.length, total_amount, records[0].record_wallet_id];
    let value_str = "";
    for(let i = 0; i < query_records.length; ++i) {
        value_str+=" (?,?,?,?,?,?,?,?,?,NOW(),NOW()) ";
        if(i!==query_records.length-1){
            value_str+=" , ";
        }
    }

    return new Promise( async (resolve, reject) => {
        var sql = `START TRANSACTION; INSERT INTO wallet_record(record_id, record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date, record_created_time, record_updated_time) VALUES ${value_str}; UPDATE wallet SET record_num = record_num + ?, wallet_total = wallet_total + ? WHERE wallet_id = ?; COMMIT`;
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [].concat(...query_records, query_wallets), (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            }
        })
    })
}

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
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        })
    });
};


export default { get_record, get_month_records, insert_record, batch_record, update_record, delete_record };
