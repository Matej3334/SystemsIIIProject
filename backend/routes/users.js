const express = require("express")
const users = express.Router();
const DB = require('../DB/dbConn.js')


users.post('/register', express.json(), async (req, res) => {
    const { id, email, password, f_name, l_name, faculty } = req.body;

    var isAlldata = id && email && password && f_name && l_name && faculty
    if (isAlldata) {
        try {
            let User = await DB.oneUser(id);
            if(!User || !User.length > 0){
                
            
            var queryResult = await DB.createUser(id, email, password, f_name, l_name, faculty);
            if (queryResult.affectedRows) {
                console.log("Registered new user")
                res.status(201).json({
                    "success": false,
                    "message": "User already exists."
                });
            }
        } else {
            console.log("User already registered")
                 res.status(400).json({
                    "success": true,
                    "message": "User with that id already exists."
                });
                
        }
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    } else {
        console.log("field is empty")
        res.status(400).json({ success: false, message: "All fields are required" });
    }
    res.end()

});


users.post('/login', express.json(), async (req, res) => {
    const { id, password } = req.body
    var Data = id && password
    if (Data) {
        try {
            let queryResult = await DB.oneUser(id);
            if (queryResult.length > 0) {
                if (password === queryResult[0].password) {
                    console.log("LOGIN SUCCESSFUL")
                    res.status(201).json({
                    "success": true,
                    "message": "Logged in"
                    });
                }
                else {
                    console.log("LOGIN UNSUCCESSFUL")
                    return res.status(401).json({ 
                    success: false, 
                    message: "Incorrect password" 
                });
                }
            }
            else {
                return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
            }
        }
        catch (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    else {
        console.log("field is empty")
        res.status(400).json({ success: false, message: "All fields are required" });
    }
    res.end()
})

module.exports = users