import mysql from "mysql2/promise";
export const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'akkal12',
    database: "notes_app"
})