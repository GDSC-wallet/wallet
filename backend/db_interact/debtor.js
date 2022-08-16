import { pool } from "./db_pool.js"
import { v4 as uuid } from 'uuid'

function print_error(err) {
    console.log("error: " + err.message);
}

// return debtor_id, debtor_name
const get_record_debtors = (record_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT debtor.debtor_id, debtor.debtor_name, debtor_record.debtor_record_amount FROM debtor INNER JOIN debtor_record ON debtor.debtor_id = debtor_record.debtor_id AND debtor_record.record_id = ? WHERE debtor.debtor_id = (SELECT debtor_id FROM debtor_record WHERE record_id = ?)";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [record_id, record_id], async (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                })
            }
        })
    })
}

const get_debtor_records = (debtor_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * FROM wallet_record WHERE record_id = (SELECT record_id FROM debtor_record WHERE debtor_id = ?)";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, debtor_id, async (err, results, fields) => {
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


// return all debtor datas
const get_all_debtors = (user_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * FROM debtor WHERE debtor_user_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, user_id, async (err, results, fields) => {
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

const insert_debtor = (debtor_user_id, debtor_name) => {
    return new Promise(async (resolve, reject) => {
        var debtor_id = 'debtor' + uuid();
        var sql = "INSERT INTO debtor(debtor_id, debtor_user_id, debtor_name, debtor_amount, debtor_created_time, debtor_updated_time) VALUE(?,?,?,0,NOW(),NOW())";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [debtor_id, debtor_user_id, conn.escape(debtor_name)], async (err, results, fields) => {
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

const insert_debtor_record = (record_id, debtor_id, record_amount) => {
    return new Promise( async (resolve, reject) => {
        var debtor_record_id = 'debtor_record_' + uuid();
        var sql = "START TRANSACTION; INSERT INTO debtor_record(debtor_record_id, debtor_id, record_id) VALUE(?,?,?); UPDATE debtor SET debtor_amount = debtor_amount + ? WHERE debtor_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [debtor_record_id, debtor_id, record_id, record_amount, debtor_id], (err, results, fields) => {
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

const delete_debtor_record = (record_id, debtor_id, record_amount) => {
    return new Promise( async (resolve, reject) => {
        var sql = "START TRANSACTION; DELETE FROM debtor_record WHERE record_id = ? AND debtor_id = ?; UPDATE debtor SET debtor_amount = debtor_amount - ? WHERE debtor_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [record_id, debtor_id, record_amount, debtor_id], (err, results, fields) => {
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

const update_debtor = (debtor_id, debtor_name) => {
    return new Promise(async (resolve, reject) => {
        var sql = "UPDATE debtor SET debtor_name = ?, debtor_updated_time = NOW() WHERE debtor_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [conn.escape(debtor_name), debtor_id], async (err, results, fields) => {
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

const delete_debtor = (debtor_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "DELETE FROM debtor WHERE debtor_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, debtor_id, async (err, results, fields) => {
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

export default { get_record_debtors, get_debtor_records, get_all_debtors, insert_debtor, insert_debtor_record, delete_debtor_record, update_debtor, delete_debtor };
