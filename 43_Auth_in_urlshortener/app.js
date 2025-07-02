import express from 'express';
import router from './routes/authRoute.js';
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', router);
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.render('index', { title: 'Url Shortener' });
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});