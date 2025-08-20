const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();
const db = mysql.createPool({
    host :process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});
console.log(`Database pool created for ${process.env.DB_NAME} on host ${process.env.DB_HOST}`);


 module.exports = db;