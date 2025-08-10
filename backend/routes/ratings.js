const express = require("express")
const rating = express.Router();
const DB = require('../DB/dbConn.js')

rating.get('/:r_id', async (req, res) => {
    try {
        const r_id = req.params.r_id;
        const queryResult = await DB.allRatings(r_id);
        res.json(queryResult);
        console.log(`sending ratings with ${r_id}`);
    }
    catch (err) {
        console.error('Error fetching ratings:', err);
        res.status(500).json({ error: 'Server error' });
    }
    res.end()
});

rating.post('/:r_id/delete', async (req, res) => {
    try {
        const r_id = req.params.r_id;
        const {u_id} = req.body;
        const queryResult = await DB.deleteRating(u_id, r_id);
        res.json(queryResult);
        console.log(`Deleted rating`);
    }
    catch (err) {
        console.error('Error with deletion', err);
        res.status(500).json({ error: 'Server error' });
    }
    res.end()
});

rating.get('/:r_id/average', async (req, res) => {
    try {
        const r_id = req.params.r_id;
        const queryResult = await DB.getAverageRating(r_id);
        res.json(queryResult);
        console.log(`sending average rating with ${r_id}`);
    }
    catch (err) {
        console.error('Error fetching ratings:', err);
        res.status(500).json({ error: 'Server error' });
    }
    res.end()
});

rating.post('/:r_id/post', async (req, res) => {
    const { u_id, r_id, score, comment } = req.body;
    isAllData = u_id && r_id && score && comment
    if (isAllData) {
        try {
            const check = await DB.checkRating(u_id , r_id);
            if(check.length == 0){
            const queryResult = await DB.addRating(u_id, r_id, score, comment);
            res.json(queryResult);
            console.log(`added rating to room ${r_id}`);
            } 
            else {
                console.log("error adding rating")
                res.status(400).json({
                    "success": false,
                    "message": "Can't have multiple ratings"
                });
            }
        }
        catch (err) {
            console.error('Error adding rating:', err);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        console.log("field is empty")
        console.log(req.body)
        res.status(400).json({ success: false, message: "All fields are required" });
    }
    res.end()
});

module.exports = rating