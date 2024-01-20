const express = require('express')
require('dotenv').config()
const router = require("./routes/client/index.router")
const app = express()
const port = process.env.PORT

app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))

// Router
router(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})