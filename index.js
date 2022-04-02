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
app.get('/user/data/get' , async (req, res) => {
    // 要求使用者資料函式呼叫
    await db_caller.authenticate('1')
    .then(stt => {
        console.log("User status: " + stt);
    })
    .catch(err => {
        console.log("Authenticate error: " + err.message);
    })

    await db_caller.user_data()
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        res.send("ERROR: " + err.message);
    })
});
