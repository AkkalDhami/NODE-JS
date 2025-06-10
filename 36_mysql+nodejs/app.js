import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'akkal12',
    database: 'test'
});


//? CREATE DATABASE
db.execute('CREATE DATABASE IF NOT EXISTS test').then(() => {
    console.log('Database created successfully');
}).catch((err) => {
    console.error('Error creating database:', err);
});
// console.log(await db.execute('SHOW DATABASES'));

//? CREATE TABLE
db.execute(
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255)
   )`
).then(() => {
    console.log('Table created successfully');
}).catch((err) => {
    console.error('Error creating table:', err);
});
console.log(await db.execute('DESC users'));

//? INSERT INTO TABLE
// db.execute(
//     'INSERT INTO users (name, email) VALUES (?, ?)',
//     ['John Doe', 'johndoe@example.com']
// ).then(() => {
//     console.log('User inserted successfully');
// }).catch((err) => {
//     console.error('Error inserting user:', err);
// });

//? INSERT MULTIPLE ROWS INTO TABLE
const values = [
    ['John Doe', 'johndoe@example.com'],
    ['Alice Smith', 'alice@sm.com'],
    ['Bob Johnson', 'bob@j.com']
]

// db.query(
//     'INSERT INTO users (name, email) VALUES ?',
//     [values]
// ).then(() => {
//     console.log('Users inserted successfully');
// }).catch((err) => {
//     console.error('Error inserting users:', err);
// })


//? SELECT FROM TABLE
const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [2]);
console.log(rows);


//? UPDATE TABLE
// db.execute(
//     'UPDATE users SET email = ? WHERE id = ?',
//     ['john@example.com', 1]
// ).then(() => {
//     console.log('User updated successfully');
// }).catch((err) => {
//     console.error('Error updating user:', err);
// });


//? DELETE FROM TABLE
db.query(
    'DELETE FROM users WHERE id = ?',
    [1]
).then(() => {
    console.log('User deleted successfully');
}).catch((err) => {
    console.error('Error deleting user:', err);
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});