import { pool } from "./db_pool.js"
import { v4 as uuid } from 'uuid'

function print_error(err) {
    console.log("error: " + err.message);
}

// return debtor_id, debtor_name
const get_record_debtors = (record_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT debtor_id, debtor_name FROM debtor WHERE debtor.debtor_id = (SELECT debtor_record.debtor_id WHERE record_id = ?)";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, record_id, async (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
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
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const insert_debtor = (debtor_user_id, debtor_name, debtor_amount) => {
    return new Promise(async (resolve, reject) => {
        var debtor_id = 'debtor' + uuid();
        var sql = "INSERT INTO debtor(debtor_id, debtor_user_id, debtor_name, debtor_amount, debtor_created_time, debtor_updated_time) VALUE(?,?,?,?,NOW(),NOW())";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [debtor_id, debtor_user_id, debtor_name, debtor_amount], async (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const insert_debtor_record = (record_id, debtor_id) => {
    return new Promise( async (resolve, reject) => {
        var debtor_record_id = 'debtor_record_' + uuid();
        var sql = "INSERT INTO debtor_record(debtor_record_id, debtor_id, record_id) VALUE(?,?,?)";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [debtor_record_id, debtor_id, record_id], (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })    
}

const delete_debtor_record = (record_id, debtor_id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "DELETE FROM debtor_record WHERE record_id = ? AND debtor_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [record_id, debtor_id], (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })
}

const update_debtor = (debtor_id, debtor_name, debtor_amount) => {
    return new Promise(async (resolve, reject) => {
        var sql = "UPDATE debtor SET debtor_name = ?, debtor_amount = ?, debtor_updated_time = NOW() WHERE debtor_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [debtor_name, debtor_amount, debtor_id], async (err, results, fields) => {
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
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
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        conn.release();
                        resolve(results);
                    }
                })
            }
        })
    })

}

export default { get_record_debtors, get_all_debtors, insert_debtor, insert_debtor_record, delete_debtor_record, update_debtor, delete_debtor };
