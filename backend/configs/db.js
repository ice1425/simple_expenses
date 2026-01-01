const e = require("express");
const mysql = require("mysql2");

const dbconn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
      connectionLimit: 10, 
      queueLimit: 0,
  ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
    }
});


// dbconn.connect((err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("connect successed");
// })

module.exports = dbconn;
