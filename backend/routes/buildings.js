const express = require("express")
const users = express.Router();
const DB = require('../DB/dbConn.js')


buildings.post('/getbuildings', express.json(), async (req, res) => {
    try{
        const [queryResult] = await DB.allBuildings();
        res.json(queryResult);
    }
    catch(err){
        console.error('Error fetching buildings:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = buildings