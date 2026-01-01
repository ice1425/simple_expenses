const mysql = require("mysql2");

const dbconn = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  port: process.env.DB_PORT ,
  ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
    }
});

dbconn.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("connect successed");
})

module.exports = dbconn;
