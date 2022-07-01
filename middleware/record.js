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
        res.status(400).json(response);
    }
}
