import { pool } from "./db_pool.js"
import { v4 as uuid } from 'uuid'

function print_error(err) {
    console.log("error: " + err.message);
}


const get_tag = (tag_id) => {
    return new Promise(async (resolve, reject) => {
        var sql = "SELECT * from wallet_record_tag_id WHERE tag_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, tag_id, (err, results, fields) => {
                    conn.release();
                    if(err) reject(err);
                    else {
                        resolve(results);
                    }
                });
            }
        })
    });
};


const insert_tag = async (tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_color) => {
    return new Promise( async (resolve, reject) => {
        var tag_id = "tag_" + uuid();
        var sql = "INSERT INTO wallet_record_tag_id(tag_id, tag_wallet_id, tag_ordinary, tag_name, tag_type, tag_created_time, tag_updated_time, tag_color) VALUE(?,?,?,?,?,NOW(),NOW(),?)";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [tag_id, tag_wallet_id, tag_ordinary, conn.escape(tag_name), tag_type, tag_color], (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            }
        });
    });
};


// tag_id, wallet_id不給改
const update_tag = async (tag_id, tag_ordinary, tag_name, tag_type, tag_color) => {
    return new Promise( async (resolve, reject) => {
        var sql = "UPDATE wallet_record_tag_id SET tag_ordinary = ?, tag_name = ?, tag_type = ?, tag_color = ? WHERE tag_id = ?";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [ tag_ordinary, conn.escape(tag_name), tag_type, tag_color, tag_id], (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                })
            }
        });
    });
};


// tag_id, wallet_id不給改
const update_all_tag = async (tags) => {

    const query_tags = tags.map((tag)=>{
        return(
            [
                tag.tag_id,
                pool.escape(tag.tag_name),
                tag.tag_ordinary,
                tag.tag_type,
                // tag.tag_updated_time.slice(0,-1),
                // "NOW()",
                tag.tag_wallet_id,
                tag.tag_color,
                // "NOW()",
            ]
        )
    });

    let value_str = "";
    query_tags.forEach((tag,index)=>{
        value_str+=" (?,?,?,?,NOW(),?,?,NOW() ) ";
        if(index!==query_tags.length-1){
            value_str+=" , ";
        }
    }
    );

    return new Promise( async (resolve, reject) => {
        var sql = `INSERT INTO wallet_record_tag_id (tag_id, tag_name, tag_ordinary, tag_type, tag_updated_time, tag_wallet_id, tag_color, tag_created_time) VALUES ${value_str} ON DUPLICATE KEY UPDATE tag_name=VALUES(tag_name), tag_ordinary=VALUES(tag_ordinary), tag_type=VALUES(tag_type), tag_updated_time=NOW(), tag_wallet_id=VALUES(tag_wallet_id), tag_color=VALUES(tag_color) `;
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [].concat(...query_tags), (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else
                        resolve();
                })
            }
        })
    });
};


const delete_tag = async (tag_id) => {
    return new Promise( async (resolve, reject) => {
        var sql = "START TRANSACTION; DELETE FROM wallet_record_tag_id WHERE tag_id = ?; UPDATE wallet_record SET wallet_record_tag_id = 'tag_default' WHERE wallet_record_tag_id = ?; COMMIT";
        pool.getConnection( async (err, conn) => {
            if(err) {
                print_error(err);
                reject(err);
            } else {
                await conn.query(sql, [tag_id, tag_id], (err, results, fields) => {
                    conn.release();
                    if(err) {
                        print_error(err);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                })
            }
        });
    });
};

export default { get_tag, insert_tag, update_tag, update_all_tag, delete_tag };
