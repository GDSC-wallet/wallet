import db_caller from "../db_interact/db_caller.js";

export const get_tag = async (req, res) => {
    await db_caller.call_tag(req.query.tag_id)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "取得tag資料失敗 error: " + err.message,
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const insert_tag = async (req, res) => {
    await db_caller.Insert_tag(req.body.tag_wallet_id, req.body.tag_ordinary, req.body.tag_name, req.body.tag_type, req.body.tag_color)
        .then(result => {
            var response = {
                "success": true,
                "message": "創建tag成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "創建tag失敗",
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const update_tag = async (req, res) => {
    await db_caller.Update_tag(req.body.tag_ordinary, req.body.tag_name, req.body.tag_type, req.body.tag_color)
        .then(result => {
            var response = {
                "success": true,
                "message": "更新tag成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "更新tag失敗",
                "data": {}
            }
            res.status(400).json(response);
        })
};

export const delete_tag = async (req, res) => {
    await db_caller.Delete_tag(req.body.tag_id)
        .then(result => {
            var response = {
                "success": true,
                "message": "刪除tag成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "刪除tag失敗",
                "data": {}
            }
            res.status(400).json(response);
        })
};


export const update_all_tag = async (req, res) => {

    await db_caller.Update_all_tag(req.body.tags)
        .then(result => {
            var response = {
                "success": true,
                "message": "更新tag成功",
                "data": {}
            }
            res.status(201).json(response);
        })
        .catch(err => {
            var response = {
                "success": false,
                "message": "更新tag失敗",
                "data": {}
            }
            res.status(400).json(response);
        })
};