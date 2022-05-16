import db_caller from "../db_interact/db_caller.js";

export const get_wallet = async (req, res) => {
    const { user_id, wallet_id, time_choosen } = req.query; 
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

    const {wallet_name,wallet_title,wallet_description} = req.body;

    //從request header取得jwt
    const token = req.headers.authorization;
    //解碼jwt取得user_id
    const decodedData = jwt.verify(token, secret);
    const user_id = decodedData?.user_id;

    await db_caller.Insert_wallet(user_id,wallet_name,wallet_title,wallet_description)
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
                "data":{}
            }
            res.status(400).json(response);
        })
};

export const update_wallet = async (req, res) => {
    await db_caller.Update_wallet(req.body.wallet_id, req.body.wallet_name, req.body.wallet_title, req.body.wallet_description)
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
    await db_caller.Delete_wallet(req.body.user_id, req.body.wallet_id)
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
