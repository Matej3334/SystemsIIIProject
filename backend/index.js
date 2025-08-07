const express = require('express')
const app = express() 
const port = 5000 //Specify your own port here!!!

app.get("/",(req,res)=>{
res.json("res");
})

///App listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})

