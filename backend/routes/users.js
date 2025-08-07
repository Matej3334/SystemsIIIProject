const express= require("express")
const users = express.Router();
const DB=require('../database/databaseConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

users.post('/register', urlencodedParser, async (req,res)=>{
    const { id, email, password, f_name, l_name, faculty } = req.body;
    
    var isAcompleteUser = id && email && password && f_name && l_name && faculty 
    if (isAcompleteUser){
    try {
        var queryResult=await DB.createUser(id, email, password, f_name, l_name, faculty);
        if(queryResult.affectedRows){
            console.log("Registered new user")
            res.status(201).json({ "success": true,
                "message": "Registered new user."});
        }
  } catch (err) {
        console.error('Error creating user:', err);
        res.status(500);
  }
    }else{
        console.log("field is empty")
    }
    res.end()

});