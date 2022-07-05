export const signUp_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "使用者註冊失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "使用者註冊成功",
            "data": {}
        }
        console.log(response);
        res.status(201).json(response);
    }
}

/*
export const getUserProfile_response = async (req, res, next) => {
    var response = {};
    // 錯誤回傳
    if(req.message) {
        response = {
            "success": false,
            "message": "取得user資料失敗 error: " + req.message,
            "data": {}
        }
        console.log(response);
        res.status(400).json(response);
    }
    // 成功回傳
    else {
        response = {
            "success": true,
            "message": "取得user資料成功",
            "data": req
        }
        console.log(response);
        res.status(201).json(response);
    }
}
*/
