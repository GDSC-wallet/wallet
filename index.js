const db = require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended : false }));
app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

app.get('/user/data/get', (req, res) => {
    var sql_data = db.get_wallet();
    var arr_data = [];
    db.get_wallet()
    .then(results => {
        for(let i=0; i<results.length; ++i){
            arr_data.push(JSON.stringify(results[i]));
        }
        console.log(arr_data);
        res.send(arr_data);
        db.close_sql_connection();
        // return arr_data;
    }).catch(err => {
        res.status(500).json({ message: 'Server error' });
        db.close_sql_connection();
    });
});
