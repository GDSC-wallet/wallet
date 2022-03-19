const db = require('./db.js')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

app.post('/login_success', (req, res) => {
    db.get_login();
})
