const express = require("express")
const reservation = express.Router();
const DB = require('../DB/dbConn.js')


reservation.post('/post', express.json(), async (req, res) => {
    const { u_id, r_id, length, use_equipment, s_time } = req.body;
    var isAlldata = u_id && r_id && length && use_equipment && s_time;
    if (isAlldata) {
        try {
            var queryResult = await DB.createReservation(u_id, r_id, s_time, length, use_equipment);
            if (queryResult.affectedRows) {
                console.log("Registered new user")
                res.status(201).json({
                    "success": true,
                    "message": "Reservation Complete"
                });
            }
            else {
                console.log("Something went wrong")
                res.status(400).json({
                    "success": false,
                    "message": "Reservation failed."
                });
            }
        }
        catch (err) {
            console.error('Error creating reservation:', err);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        console.log("field is empty")
        console.log(req.body)
        res.status(400).json({ success: false, message: "All fields are required" });
    }
    res.end()
});

module.exports = reservation