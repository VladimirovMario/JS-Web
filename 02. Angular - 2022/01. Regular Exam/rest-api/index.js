const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require("cookie-parser");

const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const gameController = require('./controllers/gameController');


const connectionString = 'mongodb://0.0.0.0:27017/exam-prep-3';
// const connectionString = 'mongodb://0.0.0.0:27017/exam-prep';
// const connectionString = 'mongodb://0.0.0.0:27017/exam';


start();

async function start() {
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    app.use('/api/users', authController);
    app.use('/api/game', gameController);
    app.use('/api/catalog', dataController);

    app.listen(3000, () => console.log('REST service started'));
}