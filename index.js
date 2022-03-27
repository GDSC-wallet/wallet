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

app.get('/user/data/get' ,(req, res) => {
    // 只要確保db_caller.get_login()先被執行就好
    const promise = new Promise(function(resolve, reject) {
        var message = db_caller.get_login();
        resolve(message);
        reject();
    });
    promise.then(message => {
        console.log(message);
        res.send(message);
    }).catch(err => {
        console.log("Error");
        res.send("Error");
    });
});
