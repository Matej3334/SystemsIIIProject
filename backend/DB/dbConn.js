const express = require('express');
const mysql = require('mysql2');

const  conn = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_DATABASE,
 })

 conn.connect((err) => {
     if(err){
         console.log("ERROR: " + err.message);
         throw err;
     }
     console.log('Connection established');
   })

let dataPool={}

dataPool.createUser=(id ,email, password, f_name, l_name, faculty)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO User (u_id, role, first_name, last_name, faculty, email, password) VALUES (?,'Student',?,?,?,?,?)`, [id, f_name, l_name, faculty, email, password], (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.allBuildings=()=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM Building`, (err,res)=>{
    if(err){
      return reject(err)
    }
     return resolve(res)
   })
 })
}

dataPool.allRooms=(b_id)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM Study_rooms WHERE b_id = ?`, [b_id], (err,res)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 })
}

dataPool.oneCapacity=(r_id)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT capacity FROM Study_rooms WHERE id = ?`, [r_id], (err,res)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 })
}

dataPool.allReservationsInRoom=(r_id)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM Reservation WHERE id = ?`, [r_id], (err,res)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 })
}

dataPool.createReservation= (u_id, r_id, status, s_time, length, use_equipment )=>{
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO Reservation (u_id, r_id, s_time, length, use_equipment) VALUES (?,?,?,?,?)`,
         [u_id, r_id, status, s_time, length, use_equipment], (err,res)=>{
      if(err){
        return reject(err)
      }
      return resolve(res)
    })
  })
}

dataPool.getReservation= (u_id)=>{
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM Reservation WHERE u_id = ?`, u_id, (err,res)=>{
      if(err){
        return reject(err)
      }
      return resolve(res)
    })
  })
}

dataPool.deleteReservation= (id)=>{
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM Reservation WHERE id = ?`, id, (err,res)=>{
      if(err){
        return reject(err)
      }
      return resolve(res)
    })
  })
}

dataPool.deleteRating = (u_id,r_id) =>{
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM Ratings WHERE id = ? AND r_id= ?`, [u_id, r_id ], (err,res)=>{
      if(err){
        return reject(err)
      }
      return resolve(res)
    })
  })
}

dataPool.editReservation=(id, s_time, length)=>{
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE Reservation 
      SET length = ?, s_time = ?
      WHERE id = ?`, [length,s_time,id], (err,res)=>{
      if(err){
        return reject(err)
      }
      return resolve(res)
    })
  })
}

dataPool.oneUser=(id)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM User WHERE u_id = ?`, [id] ,(err,res)=>{
     if(err){
      return reject(err)
    }
     return resolve(res)
   })
 })
}

dataPool.addRating=(u_id, r_id, score, comment)=>{
  return new Promise((resolve, reject)=>{
    conn.query(`INSERT INTO Ratings (u_id, r_id, score, comment) VALUES (?,?,?,?)`, [u_id, r_id, score, comment], (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.checkRating=(u_id, r_id)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM Ratings WHERE u_id = ? AND r_id = ?`, [u_id,r_id] ,(err,res)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 })
}
dataPool.allRatings=(r_id)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM Ratings WHERE r_id=?`,r_id, (err,res)=>{
    if(err){
      return reject(err)
    }
     return resolve(res)
   })
 })
}

dataPool.getAverageRating = (r_id) => {
  if (!r_id) {
    return Promise.reject(new Error('Room id (r_id) is required'));
  }
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT AVG(score) as average_score FROM Ratings WHERE r_id = ?`,
      [r_id],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res[0]?.average_score || 0);
      }
    );
  });
};
module.exports = dataPool;
