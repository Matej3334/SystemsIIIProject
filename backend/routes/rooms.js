const express = require("express")
const room = express.Router();
const DB = require('../DB/dbConn.js')


room.get('/:b_id', async (req, res) => {
    try {
        const b_id = req.params.b_id;
        const queryResult = await DB.allRooms(b_id);
        res.json(queryResult);
        console.log(`sending rooms with ${b_id}`);
    }
    catch (err) {
        console.error('Error fetching rooms:', err);
        res.status(500).json({ error: 'Server error' });
    }
    res.end()
});

room.post('/add', express.json(), async (req, res) => {
    const { b_id, name, capacity, equipment, status } = req.body;
    var isAlldata = b_id && name && capacity && equipment && status;
    if (isAlldata) {
        try {
            const queryResult = await DB.addRoom(b_id, name, capacity, equipment, status);
            if (queryResult.affectedRows) {
                console.log("Registered new room")
                res.status(201).json({
                    "success": true,
                    "message": "Room added"
                });
            } else {
                console.log("Something went wrong")
                res.status(400).json({
                    "success": false,
                    "message": "failed"
                });
            }
        }
        catch (err) {
            console.error('Error adding room:', err);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        console.log("field is empty")
        console.log(req.body)
        res.status(400).json({ success: false, message: "All fields are required" });
    }
    res.end()
})
module.exports = room