const express = require("express");
const connectDatabase = require("./database/db")
const router = require("./routes/index")
var cors = require('cors')
const app = express();
const PORT =8000 || process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended:false})) 
app.use(cors())
app.use(router)

connectDatabase()
app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT ${PORT}`)
})