const express = require("express")
const room = express.Router();
const DB = require('../DB/dbConn.js')


room.get('/:b_id', async (req, res) => { 
    try{
        const b_id = req.params.b_id;
        const queryResult = await DB.allRooms(b_id);
        res.json(queryResult);
        console.log(`sending rooms with ${b_id}`);
    }
    catch(err){
        console.error('Error fetching rooms:', err);
        res.status(500).json({ error: 'Server error' });
    }
    res.end()
});

module.exports = room