const express = require('express')
require('dotenv').config()
const DB = require('./DB/dbConn')
const app = express() 
const cors = require('cors');
const port = 3023
const users= require("./routes/users")
const build= require("./routes/buildings")
const room= require("./routes/rooms")

app.use(express.json());

app.get("/",(req,res)=>{
res.json("res");
})

app.use(cors({
    origin: `http://88.200.63.148:8005`,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
 }))

app.use('/users', users);
app.use("/build", build);
app.use('/rooms', room);

app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})

