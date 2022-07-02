require("dotenv").config()
const port = (process.env.port)
const app = require("./src/app")
app.listen(port , ()=> {console.log(`http://localhost:${port}`)})