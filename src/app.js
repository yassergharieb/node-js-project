    require("../db/connect")

const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userRouter = require("../routes/user.routes")
const authorRoutes = require("../routes/author.routes")
const bookRoutes = require("../routes/book.routes")


const path = require("path")
const staticDir = path.join(__dirname, "../images")
app.use(express.static(staticDir))


app.use("/user", userRouter)
app.use("/author" , authorRoutes)
app.use("/book" , bookRoutes)
module.exports = app