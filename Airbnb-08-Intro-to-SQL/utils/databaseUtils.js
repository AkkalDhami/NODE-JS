import mysql from "mysql2";
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "akkal12",
    database: "airbnb",
}).promise();

export { pool };