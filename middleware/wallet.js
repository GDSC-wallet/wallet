/*
export const get_wallet_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "取得wallet資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "取得wallet資料成功",
            "data": req
        }
        console.log(response);
        res.status(201).json(response);
    }
}
*/

export const insert_wallet_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "新增wallet資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "新增wallet資料成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const update_wallet_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "更新wallet資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "更新walllet資料成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const delete_wallet_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "刪除wallet資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "刪除wallet資料成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const search_record_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "搜尋record資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "搜尋record資料成功",
            "data": req
        }
        console.log(response);
        res.status(201).json(response);
    }
}
