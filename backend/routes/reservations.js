const express = require("express")
const reservation = express.Router();
const DB = require('../DB/dbConn.js')


reservation.post('/post', express.json(), async (req, res) => {
    const { u_id, r_id, length, use_equipment, s_time } = req.body;
    var isAlldata = u_id && r_id && length && use_equipment && s_time;
    if (isAlldata) {
        try {
            var check = await DB.getReservation(u_id)
            console.log(check);
            if (check.length == 0){
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
        } else {
            return res.status(401).json({ 
                success: false, 
                message: "You already have a reservation" 
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

reservation.post('/get', async (req, res) => {
    const{ u_id }=req.body;

    if (!u_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    
    try{
        const queryResult = await DB.getReservation(u_id);
        res.json(queryResult);
        console.log(`sending reservation with ${u_id}`);
    }catch(err){
        console.error('Error fetching reservation:', err);
        res.status(500).json({ error: 'Server error' });
    }
    res.end()
} )

reservation.post('/delete', async (req, res) =>{
    const { id } = req.body;
    
    if (!id) {
        return res.status(400).json({ error: 'id required' });
    }
    try{
        const queryResult = await DB.deleteReservation(id);
        if(!queryResult){
            return res.status(400).json({ error: 'reservation not found' });
        }
    }catch (err){
        console.log("Error with deleting reservation");
        res.status(500);
    }
    res.end();
})

module.exports = reservation