export const get_tag_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "取得tag資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "取得tag資料成功",
            "data": req
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const insert_tag_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "新增tag資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "新增tag資料成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const update_tag_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "更新tag資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "更新tag資料成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const update_all_tag_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "更新所有tag資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "更新所有tag資料成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const delete_tag_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "刪除tag資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "刪除tag資料成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}
