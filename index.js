const db_caller = require('./db_caller.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended : false }));
app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

// login 成功回傳資料
app.get('/api/profile' , async (req, res) => {

    // Parse request

    // 要求使用者資料函式呼叫
    await db_caller.authenticate('user_7552f100-eba2-44e1-bc7f-7a1690fd4913')
    .then(stt => {
        console.log("User status: " + stt);
    })
    .catch(err => {
        var errmsg = {
            "success": false,
            "message": "Authenticate error.",
            "data": {}
        };
        res.send(errmsg);
    })
    await db_caller.call_user_data('user_7552f100-eba2-44e1-bc7f-7a1690fd4913')
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        var errmsg = {
            "success": false,
            "message": "Getting user data error.",
            "data": {}
        };
        res.send(errmsg);
    })
});

app.get('/api/wallet' , async (req, res) => {

    // Parse request

    await db_caller.call_wallet('wallet_dacbbdb7-4e2b-47ed-ad42-da878ab81890')
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        var errmsg = {
            "success": false,
            "message": "Getting wallet data error.",
            "data": {}
        };
        res.send(errmsg);
    })
});
