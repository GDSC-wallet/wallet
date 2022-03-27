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

app.get('/user/data/get' ,(req, res) => {
    var arr_data = [];
    db_dealer.get_wallet()
    .then(results => {
        console.log("entry get_wallet.resolve function.");
        for(let i=0; i<results.length; ++i){
            arr_data.push(JSON.stringify(results[i]));
        }
        console.log(arr_data);
        db_dealer.close_sql_connection();
        console.log("get_login function is done.");
        res.send(arr_data);
    }).catch(err => {
        console.log("entry get_wallet.reject function.");
        db_dealer.close_sql_connection();
        console.log("get_login function is done.");
        res.send(err);
    });
});
