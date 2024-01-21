const express = require('express')
require('dotenv').config()
const routerAdmin = require("./routes/admin/index.router")
const router = require("./routes/client/index.router")
const database = require("./config/database")

const app = express()
const port = process.env.PORT
database.connect();
app.set("vỉews","./views")
app.set('view engine', 'pug')
app.use(express.static("public"))

// Router
routerAdmin(app)
router(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})