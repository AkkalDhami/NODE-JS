import express from 'express';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/authRoutes.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    let isLoggedIn = req.cookies.isLoggedIn;
    res.render('index', { title: 'Url Shortener', isLoggedIn });
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});