import db_caller from "../db_interact/db_caller.js";

export const get_wallet = async (req, res) => {
    const { wallet_id } = req.params; 
    await db_caller.call_wallet(wallet_id)
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
    // debug用 "user_7552f100-eba2-44e1-bc7f-7a1690fd4913", "test wallet", "test", "test"
    await db_caller.Insert_wallet("user_7552f100-eba2-44e1-bc7f-7a1690fd4913","test_wallet","test","test"/*req.body.user_id, req.body.wallet_name, req.body.wallet_title, req.body.wallet_description*/)
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
