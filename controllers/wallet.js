import db_caller from "../db_interact/db_caller.js";

export const get_wallet = async (req, res) => {
    
    // 在這裡先parse request
    
    await db_caller.call_wallet("wallet_dacbbdb7-4e2b-47ed-ad42-da878ab81890") // debug用
    .then(response => {
        res.status(200).json(response);
    })
    .catch(result => {
        var response = {
            "success": false,
            "message": "取得使用者資料失敗",
            "data": {}
        }
        res.status(200).json(response);
    })
};

export const insert_wallet = async (req, res) => {

    // 同樣先parse request

    await db_caller.Insert_wallet(user_id, wallet_name, wallet_title, wallet_description)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(response => {
        res.status(201).json(response);
    })
};

export const update_wallet = async (req, res) => {
    res.status(201).json({ result:"success" });
};
export const delete_wallet = async (req, res) => {
    res.status(201).json({ result:"success" });
};
