export const get_record_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "取得record資料失敗 error: " + req.message,
            "data": {}
        }
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "取得record資料成功",
            "data": req
        }
        res.status(201).json(response);
    }
}


export const insert_record_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "新增record資料失敗 error: " + req.message,
            "data": {}
        }
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "新增record資料成功",
            "data": {}
        }
        res.status(201).json(response);
    }
}


export const update_record_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "更新record資料失敗 error: " + req.message,
            "data": {}
        }
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "更新record資料成功",
            "data": {}
        }
        res.status(201).json(response);
    }
}


export const delete_record_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "刪除record資料失敗 error: " + req.message,
            "data": {}
        }
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "刪除record資料成功",
            "data": {}
        }
        res.status(201).json(response);
    }
}
