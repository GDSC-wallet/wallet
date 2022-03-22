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
    var sql_data = db.get_login();
    console.log(sql_data);
    res.send(sql_data);
})
