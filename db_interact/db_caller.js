import db_dealer from './db_dealer.js'

// 問資料庫user是否存在
const authenticate = (id) => {
    return new Promise( async(resolve, reject) => {
        await db_dealer.user_exist(id)
            .then(results => {
                if(results.length == 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }).catch(err => {
                console.log("ERROR: " + err.message);
                reject(err);
            });
    });
}

// about user
const call_user_data = (user_id) => {
    return new Promise( async (resolve, reject) => {
        var user_status;
        var selected_wallet;
        var response = {};
        await db_dealer.get_user(user_id)    // 之後parse req得到要求的user id,just for testing
            .then(results => {
                if(results.length > 0)
                    user_status = true;
                else
                    user_status = false;
                // 確認被選擇的wallet, 而被選擇的wallet必須只有一個
                for(let i = 0; i < results.length; ++i) {
                    if(results[i].selected == 1) {
                        selected_wallet = results[i].wallet_id;
                        break;
                    }
                }
                // 將資料轉成需要的JSON格式
                var Data = {
                    success: user_status,
                    message:"取得使用者資料成功",
                    data:{
                        user_id: results[0].id,
                        username: results[0].username,
                        nickname: results[0].nickname,
                        selected_wallet_id: selected_wallet,
                        wallets:[
                        ]
                    }
                };

                // 填寫wallets陣列和wallets陣列中的records陣列
                for(let i = 0; i < results.length;) {
                    // construct a wallet object
                    var wallet_obj = {
                        "wallet_id": results[i].wallet_id,
                        "wallet_name": results[i].wallet_name,
                        "wallet_title": results[i].wallet_title,
                        "wallet_total": results[i].wallet_total,
                        "wallet_description": results[i].wallet_description,
                        "selected": results[i].selected,
                        "record_num": results[i].record_num,
                        records:[]
                    };
                    // construct a record array
                    var record_arr = [];
                    var j = 0;
                    if(results[i].selected == 1) {
                        for(j = 0; j < results[i].record_num; ++j) {
                            // 若已經沒有資料或已是不同wallet,則提早break
                            if(i + j >= results.length || results[i+j].wallet_id != results[i].wallet_id)
                                break;
                            var record_obj = {
                                record_id: results[i+j].record_id,
                                wallet_record_tag_id: results[i+j].wallet_record_tag_id,
                                record_ordinary: results[i+j].record_ordinary,
                                record_name: results[i+j].record_name,
                                record_description: results[i+j].record_description,  //
                                record_amount: results[i+j].record_amount,    //
                                record_type: results[i+j].record_type,    //
                                record_date: results[i+j].record_date,    //
                                record_created_time: results[i+j].record_created_time,
                                record_updated_time: results[i+j].record_updated_time
                            }
                            record_arr.push(record_obj);
                        }
                    }
                    if(j == 0) i++;
                    else
                        i += j;
                    // put record array into wallet object and put wallet object into response.data.wallets
                    wallet_obj.records = record_arr;
                    console.log(wallet_obj);
                    Data.data.wallets.push(wallet_obj);
                }
                console.log(Data);
                response = Data;
                resolve(response);
            }).catch(err => {
                console.log('ERROR: ' + err.message);
                reject(err);
            });
    });
}

// about wallet
const call_wallet = (wallet_id) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.get_wallet(wallet_id)
            .then(results => {
                var response = {
                    "success": true,
                    "message": "取得wallet資料成功",
                    "data": {
                        "wallet_id": results[0].wallet_id,
                        "wallet_name": results[0].wallet_name,
                        "wallet_title": results[0].wallet_title,
                        "wallet_total": results[0].wallet_total,
                        "wallet_description": results[0].wallet_description,
                        "record_num": results[0].record_num,
                        "records": []
                    }
                };
                for(var i = 0; i < results.length; ++i) {
                    var record_data = {
                        "record_id": results[i].record_id,
                        "wallet_record_tag_id": results[i].wallet_record_tag_id,
                        "record_ordinary": results[i].record_ordinary,
                        "record_name": results[i].record_name,
                        "record_description": results[i].record_description,
                        "record_amount": results[i].record_amount,
                        "record_type": results[i].record_type,
                        "record_date": results[i].record_date,
                        "record_created_time": results[i].record_created_time,
                        "record_updated_time": results[i].record_updated_time
                    }
                    response.data.records.push(record_data);
                }
                console.log(response);
                resolve(response);
            })
            .catch(err => {
                console.log('ERROR: ' + err.message);
                reject(err);
            });
    })
}

const sign_up = (channel, channel_id, email, username, nickname) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.insert_user(channel, channel_id, email, username, nickname)
            .then(response => {
                console.log("user inserted successfully.");
                resolve();
            })
            .catch(err => {
                console.log("user inserted failed.");
                reject(err);
            })
    });
}

const Insert_wallet = (user_id, wallet_name, wallet_title, wallet_description) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.insert_wallet(user_id, wallet_name, wallet_title, wallet_description)
            .then(response => {
                console.log("wallet inserted successfully.");
                resolve();
            })
            .catch(err => {
                console.log("wallet inserted failed.");
                reject(err);
            })
    });
}

const Update_wallet = (wallet_id, wallet_name, wallet_title, wallet_description) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.update_wallet(wallet_id, wallet_name, wallet_title, wallet_description)
            .then(response => {
                console.log("wallet updated successfully.");
                resolve();
            })
            .catch(err => {
                console.log("wallet updated failed.");
                reject(err);
            })
    });
}

const Delete_wallet = (user_id, wallet_id) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.delete_wallet(user_id, wallet_id)
            .then(response => {
                console.log("wallet deleted successfully.");
                resolve();
            })
            .catch(err => {
                console.log("wallet deleted failed.");
                reject(err);
            })
    });
}

// about record
const call_record = (record_id) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.get_record(record_id)
            .then(results => {
                var response = {
                    "success": true,
                    "message": "取得record資料成功",
                    "data": results
                }
                console.log(response);
                resolve(response);
            })
            .catch(err => {
                console.log('ERROR: ' + err.message);
                reject(err);
            });
    })
}

const Insert_record = (record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.insert_record(record_wallet_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date)
            .then(response => {
                console.log("record inserted successfully.");
                resolve();
            })
            .catch(err => {
                console.log("record inserted failed.");
                reject(err);
            })
    });
}

const Update_record = (record_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.update_wallet(record_id, wallet_record_tag_id, record_ordinary, record_name, record_description, record_amount, record_type, record_date)
            .then(response => {
                console.log("record updated successfully.");
                resolve();
            })
            .catch(err => {
                console.log("record updated failed.");
                reject(err);
            })
    });
}

const Delete_record = (record_id, record_wallet_id, record_amount) => {
    return new Promise( async (resolve, reject) => {
        await db_dealer.delete_record(record_id, record_wallet_id, record_amount)
            .then(response => {
                console.log("record deleted successfully.");
                resolve();
            })
            .catch(err => {
                console.log("record deleted failed.");
                reject(err);
            })
    });
}

export default { call_wallet, call_user_data, call_record, authenticate, sign_up,  Insert_wallet, Update_wallet, Delete_wallet, Insert_record, Update_record };

// 暫時先不做關閉資料庫的動作
