const express = require('express');
const fs = require('fs');
let users = require('./MOCK_DATA.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.get('/users', (req, res) => {
    return res.send(`
        <ul>${users.map(user =>
        `<li>${user.first_name} ${user.last_name}</li>`).join('')}
        </ul>
        `);
})

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id);
    return res.json({ status: "success", user });
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });
    console.log(body);
})

app.route('/api/users/:id')
    .patch((req, res) => {
        const { id } = req.params;
        const body = req.body;
        console.log(body, id);
        users = users.map(user => user.id == id ? { ...user, ...body } : user);
        fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to update user data" });
            }
            return res.json({ status: "success", id });
        });
    })
    .delete((req, res) => {
        const { id } = req.params;
        users = users.filter(user => user.id != id);
        fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to delete user data" });
            }
            return res.json({ status: "success", id });
        });
    });


app.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000');
});