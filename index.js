const db_caller = require('./db_caller.js')
const db_dealer = require('./db_dealer.js')
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
app.get('/user/data/get' ,(req, res) => {
    db_caller.user_data()
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        res.send("ERROR: " + err.message);
    })
});
