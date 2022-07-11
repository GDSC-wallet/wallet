export const insert_debtor_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "新增債務人失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "新增債務人成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const insert_debtor_record_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "新增帳目債務人失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "新增帳目債務人成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const delete_debtor_record_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "刪除帳目債務人失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "刪除帳目債務人成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const update_debtor_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "更新債務人失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "更新債務人成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}


export const delete_debtor_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "刪除債務人失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "刪除債務人成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}
