import db_caller from "../db_interact/db_caller.js";

export const get_wallet = async (req, res) => {
    const { wallet_id, time_choosen } = req.query;

    // 從 req.decodedData 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.decodedData?.user_id;
    
    await db_caller.call_wallet(/*"id_roy","wallet_11f0c4ed-edef-436d-9b67-46812cdc1d08"*/user_id, wallet_id, time_choosen)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(result => {
            var response = {
                "success": false,
                "message": "取得wallet資料失敗",
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const insert_wallet = async (req, res) => {

    const { wallet_name, wallet_title, wallet_description } = req.body;

    // 從 req.decodedData 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.decodedData?.user_id;

    await db_caller.Insert_wallet(user_id, wallet_name, wallet_title, wallet_description)
        .then(result => {
            var response = {
                "success": true,
                "message": "創建wallet成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "創建wallet失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const update_wallet = async (req, res) => {
    const {wallet_id,wallet_name, wallet_title, wallet_description} = req.body
    await db_caller.Update_wallet(wallet_id, wallet_name, wallet_title, wallet_description)
        .then(result => {
            var response = {
                "success": true,
                "message": "更新wallet成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "更新wallet失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const delete_wallet = async (req, res) => {

    const {user_id,wallet_id} = req.body
    await db_caller.Delete_wallet(user_id, wallet_id)
        .then(result => {
            var response = {
                "success": true,
                "message": "刪除wallet成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "刪除wallet失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const update_wallet_tag = async (req, res) => {

    const {user_id,wallet_id} = req.body
    await db_caller.Delete_wallet(user_id, wallet_id)
        .then(result => {
            var response = {
                "success": true,
                "message": "刪除wallet成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "刪除wallet失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};